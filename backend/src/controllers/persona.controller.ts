import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Credenciales, Persona} from '../models';
import {EmailRepository, PersonaRepository} from '../repositories';
import {AutenticacionService, NotificacionService, RegistroService} from '../services';

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,

    @repository(EmailRepository)
    public emailRepository: EmailRepository,

    @service(AutenticacionService)
    public autenticacionService: AutenticacionService,

    @service(NotificacionService)
    public notificacionService: NotificacionService,

    @service(RegistroService)
    public registroService: RegistroService,
  ) { }

  /**
   * Se encarga del token donde el cliente debe verificar su email para
   * dejarlo iniciar sesión
   * @param token
   * @returns
   */
  //@authenticate("cliente")
  @get('/verifyEmail/{token}')
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
    let datos = await this.autenticacionService.ValidarTokenJWT(token);
    let correo = await this.emailRepository.findOne({where: {email: datos.email}});
    if (correo == null)
      throw new HttpErrors[401]("El correo es null.")
    if (correo.estado == "VERIFIED") {
      throw new HttpErrors[401]("El email ya había sido verificado");
    } else if (correo.estado == "UNVERIFIED") {
      await this.emailRepository.updateById(correo.id, {
        "estado": "VERIFIED"
      });
      let user = await this.personaRepository.findOne({where: {id_email: correo.id}});
      if (user)
        return user;
      else
        throw new HttpErrors[401]("Error verificando el usurio registrado para ese correo.")
    } else {
      throw new HttpErrors[401]("Email no encontrado");
    }
  }

  /**
   * Se encarga del inicio de sesión: identificar personas con sus credenciales
   * de acceso (usuario y contraseña)
   * @param credenciales
   * @returns
   */
  //@authenticate("asesor", "admin", "cliente")
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
      let em = await this.emailRepository.findById(p.id_email);
      if (p.id_rol == 3 && em.estado == "UNVERIFIED")
        throw new HttpErrors[401]("Debe verificar su email primero");
      else {
        let token = this.autenticacionService.GenerarTokenJWT(p);
        return {
          datos: {
            id: p.id,
            nombres: p.nombres,
            apellidos: p.apellidos,
            celular: p.celular,
            correo: em.email,
            rol: p.id_rol
          },
          tk: token
        }
      }
    } else {
      throw new HttpErrors[401]("Datos inválidos");
    }
  }

  /**
   * Recuperar contraseña donde requiere el usuario, osea el email, y
   * pasar la contraseña en vacío "". Eso para utilizar el mismo modelo
   * de credenciales
   * @param credenciales
   * @returns
   */
  @patch('/recuperarClave')
  @response(200, {
    description: "Recuperación de Clave",
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async recuperarClave(
    @requestBody() credenciales: Credenciales
  ) {
    let correo = await this.emailRepository.findOne({where: {email: credenciales.usuario}});
    let persona = await this.personaRepository.findOne({where: {id_email: correo?.id}});
    if (correo?.estado == "VERIFIED") {
      if (persona) {
        let clave = this.autenticacionService.GenerarClave();
        let claveCifrada = this.autenticacionService.CifrarClave(clave);
        persona.id_email = correo.email;
        //Notificar al usuario
        this.notificacionService.NotificarRecuperacionClave(persona, clave);
        persona.clave = claveCifrada;
        persona.id_email = correo.getId();
        await this.personaRepository.updateById(persona.id, persona);
        return {
          nombre: `${persona.nombres} ${persona.apellidos}`,
          correo: correo.email,
          id: persona.id
        }
      } else {
        throw new HttpErrors[401]("No existe un usuario registrado con ese email.");
      }
    } else {
      throw new HttpErrors[401]("El email no esá registrado o verificado aún.");
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
