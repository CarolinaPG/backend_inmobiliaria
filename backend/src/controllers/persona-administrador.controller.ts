import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import { Persona } from '../models';
import { FormularioRegistro } from '../models/formulario-registro.model';
import { Credenciales } from '../models';
import {PersonaRepository, EmailRepository, } from '../repositories';
import { AutenticacionService, NotificacionService, RegistroService } from '../services';
import { authenticate } from '@loopback/authentication';
import { Llaves } from '../config/llaves';
import { Console } from 'console';

export class PersonaAdministradorController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,

    @repository(EmailRepository)
    public emailRepository : EmailRepository,

    @service(AutenticacionService)
    public autenticacionService : AutenticacionService,

    @service(NotificacionService)
    public notificacionService : NotificacionService,

    @service(RegistroService)
    public registroService : RegistroService,

    
  ) {}

  /**
   * Registrar un administrador a la base de datos
   * @param formulario 
   * @returns 
   */
  //@authenticate("admin")
  @post('/administradores')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async createAdmin(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioRegistro, {
            title: 'NewRegistro',
            
          }),
        },
      },
    })
    formulario: FormularioRegistro,
  ): Promise<Persona> {
    if(await this.registroService.ValidarEmail(formulario.email) == null){
      if(await this.registroService.ValidarPersona(formulario.id) == null){
        try{
          let correo = await this.registroService.RegistrarCorreo(formulario.email);
          let clave = this.autenticacionService.GenerarClave();
          let claveCifrada = this.autenticacionService.CifrarClave(clave);
          let persona = await this.registroService.RegistrarPersona(formulario);
          console.log("****************");
          console.log(clave);
          console.log("****************");
          await this.personaRepository.updateById(formulario.id, {
            "clave": claveCifrada,
            "id_email": correo.getId(),
            "id_rol": 1
          });
          await this.notificacionService.NotificarRegistroAdmin(formulario, clave);
          await this.emailRepository.updateById(correo.getId(), {
            "estado": "VERIFIED"
          });
          return await this.personaRepository.findById(formulario.id);
        } catch (e) {
          throw new HttpErrors[401]("Error registrando al administrador.");
        }
      } else {
        throw new HttpErrors[401]("El id de usuario ya se encuentra registrado");
      }
    } else {
      throw new HttpErrors[401]("El email ya ha sido registrado.");
    }
  }


  //@authenticate("admin")
  @get('/administradores')
  @response(200, {
    description: 'Array of Persona model instances (tipo Administrador)',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async findAdministradores(
    @param.filter(Persona) filter?: Filter<Persona>
  ): Promise<Persona[]> {
    let admins = await this.personaRepository.find(filter? filter : {include: [
      {relation: 'email'},
      {relation: 'rol',},
    ],
      where: {id_rol: 1}, 
    });
    return admins;
  }


  //@authenticate("admin")
  @get('/administradores/{id}')
  @response(200, {
    description: 'Persona model instance (tipo Adminsitrador)',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findByIdAdmins(
    @param.path.string('id') id: string,
    //@param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
    @param.filter(Persona) filter?: Filter<Persona>
    ): Promise<Persona> {
      let admin =  await this.personaRepository.findById(id, filter? filter : {include: [
        {relation: 'email'},
        {relation: 'rol',},
      ],
        where: {id_rol: 3}, 
      });
      return admin;
    }


  //@authenticate("admin")
  @patch('/administradores/{id}')
  @response(204, {
    description: 'Persona PATCH success (tipo Administrador)',
  })
  async updateByIdAdministradores(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioRegistro, {partial: true}),
        },
      },
    })
    formulario: FormularioRegistro,
    @param.filter(Persona) filter?: Filter<Persona>
  ): Promise<void> {
    let admin = await this.personaRepository.findById(id, filter? filter : {where: {id_rol: 1}});
    let persona: Persona = new Persona();
    persona.id = admin.id;
    if (formulario.tipoId)
      persona.tipoId = formulario.tipoId;
    else
      persona.tipoId = admin.tipoId;
    if (formulario.nombres)
      persona.nombres = formulario.nombres;
    else
      persona.nombres = admin.nombres;
    if (formulario.apellidos)
      persona.apellidos = formulario.apellidos;
    else
      persona.apellidos = admin.apellidos;
    if (formulario.celular)
      persona.celular = formulario.celular;
    else
      persona.celular = admin.celular;
    if (formulario.email)
      persona.id_email = admin.id_email;
    await this.personaRepository.updateById(id, persona);
  }


  //@authenticate("admin")
  @del('/administradores/{id}')
  @response(204, {
    description: 'Persona DELETE success (tipo Administrador)',
  })
  async deleteByIdCliente(@param.path.string('id') id: string): Promise<void> {
    let admin = await this.personaRepository.findById(id);
    if(admin && admin.id_rol == 1){
      await this.emailRepository.deleteById(admin.id_email);
      await this.personaRepository.deleteById(id);
    } else {
      throw new HttpErrors[401]("Error eliminando el adminsitrador.")
    }
  }
}
