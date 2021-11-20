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
import {service} from '@loopback/core';
import {Llaves} from '../config/llaves';
import {Credenciales, Persona} from '../models';
import {PersonaRepository, EmailRepository} from '../repositories';
import {AutenticacionService, NotificacionService} from '../services';
//const fetch = require("node-fetch");
const fetch = require("cross-fetch");

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
    @repository(EmailRepository)
    public emailRepository : EmailRepository,
    @service(AutenticacionService) public servicioAutenticacion: AutenticacionService,
    @service(NotificacionService) public servicioNotificacion: NotificacionService
  ) {}

  @post('/identificarPersona', {
    responses: {
      '200': {
        description: "Identificación de usuarios"
      }
    }
  })
  async identificarPersona(
    @requestBody() credenciales: Credenciales
  ) {
    let p = await this.servicioAutenticacion.IdentificarPersona(credenciales.usuario, credenciales.clave);
    if (p) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(p);
      return {
        datos: {
          nombre: p.nombres,
          correo: p.id_email,
          id: p.id
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos inválidos");
    }
  }

  @patch('/recuperarClave', {
    responses: {
      '200': {
        description: "Recuperación de Clave"
      }
    }
  })
  async recuperarClave(
    @requestBody() credenciales: Credenciales
  ) {
    console.log(credenciales.usuario)
    let correo = await this.emailRepository.findOne({where: {email: credenciales.usuario}});
    let persona = await this.personaRepository.findOne({where: {id_email: correo?.id}});
    if(correo){
      if(persona){
        let clave = this.servicioAutenticacion.GenerarClave();
        let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
        persona.clave = claveCifrada;
        console.log(clave);
        //Notificar al usuario
        this.servicioNotificacion.NotificarRecuperacionClave(persona, clave);
        persona.id_email = correo.getId();
        await this.personaRepository.updateAll(persona);
        console.log("************************************************************");
        return {
            datos: {
              nombre: persona.nombres,
              correo: correo.email,
              id: persona.id
          }
        }
      } else {
        throw new HttpErrors[401]("No existe un usuario registrado con ese email.");
      } 
    } else {
      throw new HttpErrors[401]("El email NO ESTÁ registrado");
    } 
  }

  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',
            
          }),
        },
      },
    })
    persona: Persona,
  ): Promise<Persona> {
    console.log("****************");
    let existe = await this.emailRepository.findOne({where: {email: persona.id_email}});
    if(!existe){
      let correo = await this.emailRepository.create({
        "email": persona.id_email,
        "id_estado": 9
      });
      let clave = this.servicioAutenticacion.GenerarClave();
      let claveCifrada = this.servicioAutenticacion.CifrarClave(clave);
      persona.clave = claveCifrada;
      console.log(clave);
      //Notificar al usuario
      this.servicioNotificacion.NotificarRegistroPlataforma(persona, clave);
      persona.id_email = correo.getId();
      let p = await this.personaRepository.create(persona);
      console.log("************************************************************");
      return p;
    //return this.personaRepository.create(persona);
    } else {
      throw new HttpErrors[401]("El email YA ESTÁ registrado");
    } 
  }

  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
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
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
