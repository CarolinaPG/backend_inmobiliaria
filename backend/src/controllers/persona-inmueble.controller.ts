import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Persona,
  Inmueble,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaInmuebleController {
  constructor(
    @repository(PersonaRepository) protected personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Persona has one Inmueble',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inmueble),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble> {
    return this.personaRepository.inmueble(id).get(filter);
  }

  @post('/personas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Persona model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Persona.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInPersona',
            exclude: ['id'],
            optional: ['id_asesor']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.personaRepository.inmueble(id).create(inmueble);
  }

  @patch('/personas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Persona.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Partial<Inmueble>,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.personaRepository.inmueble(id).patch(inmueble, where);
  }

  @del('/personas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Persona.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.personaRepository.inmueble(id).delete(where);
  }
}
