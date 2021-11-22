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

@authenticate("admin")
export class PersonaController {
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

  @authenticate.skip()
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
    let p = await this.autenticacionService.IdentificarPersona(credenciales.usuario, credenciales.clave);
    if (p) {
      let token = this.autenticacionService.GenerarTokenJWT(p);
      return {
        datos: {
          id: p.id,
          nombres: p.nombres,
          apellidos: p.apellidos,
          celular: p.celular,
          correo: p.id_email,
          rol: p.id_rol
        },
        tk: token
      }
    } else {
      throw new HttpErrors[401]("Datos inválidos");
    }
  }
 
  ///**
  @post('/personaAdmin')
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
    //return this.personaRepository.create(persona);
  }

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
    this.registroService.ValidarDatos(formulario, 2);
    
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
  }

  @authenticate("asesor")
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
    this.registroService.ValidarDatos(formulario, 3);
    
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
      "id_rol": 1
    });

    //Debe validar correo
    //hash = con id unico
    let token = this.autenticacionService.GenerarTokenJWTEmail(formulario.email);
    
    let urlConfirm = await this.notificacionService.NotificarRegistroPlataforma(formulario, clave, token);
    await this.emailRepository.updateById(correo.id, {
      "hash": ""
    });
    
    return await this.personaRepository.findById(formulario.id);
    //return this.personaRepository.create(persona);
  }

  @get('/personas/{token}')
  @response(200, {
    description: 'Verificacion de email',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async verificarEmail(
    @param.path.string('token') token: string,
  ): Promise<Persona> {
    try {
      let datos = this.autenticacionService.ValidarTokenJWT(token);
      console.log(datos);
      /**
      let correo = await this.emailRepository.findOne({where: {email: datos.email}});
      if(correo != null){
        if(correo?.estado == "VERIFIED")
          throw new HttpErrors[401]("El email ya había sido verificado");
        correo.estado = "VERIFIED";
        let user =  await this.personaRepository.findOne({where: {id_email: correo.id}});
        if(user != null)
          return user;
        else
          throw new HttpErrors[401]("Error verificando el usurio registrado para ese correo.")
      } else {
       */
        throw new HttpErrors[401]("Error verificando el correo");
      //}
    } catch (err) {
      throw new HttpErrors[401]("Usuario no encontrado");
    }
  }

  //*/
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
    return this.personaRepository.create(persona);
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
