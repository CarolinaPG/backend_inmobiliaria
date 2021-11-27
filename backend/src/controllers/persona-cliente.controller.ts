import { service } from '@loopback/core';
import { Count, CountSchema, Filter, FilterExcludingWhere, repository, Where, } from '@loopback/repository';
import { post, param, get, getModelSchemaRef, patch, put, del, requestBody, response, HttpErrors, } from '@loopback/rest';
import { Persona } from '../models';
import { FormularioRegistro } from '../models/formulario-registro.model';
import { Credenciales } from '../models';
import {PersonaRepository, EmailRepository, } from '../repositories';
import { AutenticacionService, NotificacionService, RegistroService } from '../services';
import { authenticate } from '@loopback/authentication';
import { Llaves } from '../config/llaves';
import { Console } from 'console';

export class PersonaClienteController {
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
   * Registrar un cliente a la base de datos
   * @param formulario 
   * @returns 
   */
  //@authenticate("asesor", "admin")
  @post('/personaCliente')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async createCliente(
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
    if(await this.registroService.ValidarDatos(formulario, 3)){
    
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
        "id_rol": 3
      });

      //Debe validar correo
      //hash = con id unico
      let token = this.autenticacionService.GenerarTokenJWTEmail(formulario.email);
      
      let urlConfirm = await this.notificacionService.NotificarRegistroPlataforma(formulario, clave, token);
      await this.emailRepository.updateById(correo.id, {
        "hash": urlConfirm
      });

      return await this.personaRepository.findById(formulario.id);
    } else {
      throw new HttpErrors[401]("Error en los datos")
    }
  }


  //@authenticate("asesor", "admin")
  @get('/clientes')
  @response(200, {
    description: 'Array of Persona model instances (tipo Cliente)',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async findClientes( ): Promise<Persona[]> {
    let clientes = await this.personaRepository.find({where: {id_rol: 3}})
    return clientes;
  }


  //@authenticate("admin", "asesor")
  @get('/clientes/{id}')
  @response(200, {
    description: 'Persona model instance (tipo Cliente)',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findByIdClientes(
    @param.path.string('id') id: string,
    //@param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    let cliente =  await this.personaRepository.findOne({where: {id: id, id_rol: 3}} );
    if (cliente)
      return cliente;
    else
      throw new HttpErrors[401]("Error encontrando al cliente.")
  }


  //@authenticate("admin", "asesor")
  @patch('/clientes/{id}')
  @response(204, {
    description: 'Persona PATCH success (tipo Cliente)',
  })
  async updateByIdClientes(
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
    let cliente = await this.personaRepository.findById(id);
    if (cliente.id_rol == 3)
      await this.personaRepository.updateById(id, persona);
    else
      throw new HttpErrors[401]("El ID no corresponde a un cliente.")
  }


  @del('/clientes/{id}')
  @response(204, {
    description: 'Persona DELETE success (tipo Cliente)',
  })
  async deleteByIdCliente(@param.path.string('id') id: string): Promise<void> {
    let cliente = await this.personaRepository.findById(id);
    if(cliente && cliente.id_rol == 3){
      await this.emailRepository.deleteById(cliente.id_email);
      await this.personaRepository.deleteById(id);
    } else {
      throw new HttpErrors[401]("Error eliminando el cliente.")
    }
  }


}
