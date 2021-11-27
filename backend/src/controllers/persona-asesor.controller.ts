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

export class PersonaAsesorController {
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
   * Registrar un asesor a la base de datos
   * @param formulario 
   * @returns 
   */
   @authenticate("admin")
   @post('/personaAsesor')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async createAsesor(
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
    if(await this.registroService.ValidarDatos(formulario, 2)){
      let correo = await this.registroService.RegistrarCorreo(formulario.email);
      let clave = this.autenticacionService.GenerarClave();
      let claveCifrada = this.autenticacionService.CifrarClave(clave);
      await this.registroService.RegistrarPersona(formulario);
      console.log("****************");
      console.log(clave);
      console.log("****************");
      await this.personaRepository.updateById(formulario.id, {
        "clave": claveCifrada,
        "id_email": correo.getId(),
        "id_rol": 2
      });

      //Debe confirmar por correo si acepta o no
      //hash = formulario de aceptación
      await this.emailRepository.updateById(correo.id, {
        "hash": ""
      });
      return await this.personaRepository.findById(formulario.id);
      //return this.personaRepository.create(persona);
    } else {
      throw new HttpErrors[401]("Error en los datos")
    }
  }


  @authenticate("admin")
  @get('/asesores')
  @response(200, {
    description: 'Array of Persona model instances (tipo Asesor)',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async findAsesores( ): Promise<Persona[]> {
    let asesores = await this.personaRepository.find({where: {id_rol: 2}})
    return asesores;
  }

  @authenticate("admin")
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
  async findAdministradores( ): Promise<Persona[]> {
    let admins = await this.personaRepository.find({where: {id_rol: 1}})
    return admins;
  }


  @authenticate("admin")
  @get('/asesores/{id}')
  @response(200, {
    description: 'Persona model instance (tipo Asesor)',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findByIdAsesores(
    @param.path.string('id') id: string,
    //@param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    let asesor =  await this.personaRepository.findOne({where: {id: id, id_rol: 2}} );
    if (asesor)
      return asesor;
    else
      throw new HttpErrors[401]("Error encontrando al asesor.")
  }


  @authenticate("admin", "asesor")
  @patch('/asesores/{id}')
  @response(204, {
    description: 'Persona PATCH success (tipo Asesor)',
  })
  async updateByIdAsesores(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    let asesor = await this.personaRepository.findById(id);
    if (asesor.id_rol == 2)
      await this.personaRepository.updateById(id, persona);
    else
      throw new HttpErrors[401]("El ID no corresponde a un asesor.")
  }


  @del('/asesores/{id}')
  @response(204, {
    description: 'Persona DELETE success (tipo Asesor)',
  })
  async deleteByIdCliente(@param.path.string('id') id: string): Promise<void> {
    let asesor = await this.personaRepository.findById(id);
    if(asesor && asesor.id_rol == 2){
      await this.emailRepository.deleteById(asesor.id_email);
      await this.personaRepository.deleteById(id);
    } else {
      throw new HttpErrors[401]("Error eliminando el asesor.")
    }
  }

}
