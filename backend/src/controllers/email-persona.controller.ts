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
  Email,
  Persona,
} from '../models';
import {EmailRepository} from '../repositories';

export class EmailPersonaController {
  constructor(
    @repository(EmailRepository) protected emailRepository: EmailRepository,
  ) { }

  @get('/emails/{id}/persona', {
    responses: {
      '200': {
        description: 'Email has one Persona',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Persona),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Persona>,
  ): Promise<Persona> {
    return this.emailRepository.persona(id).get(filter);
  }

  @post('/emails/{id}/persona', {
    responses: {
      '200': {
        description: 'Email model instance',
        content: {'application/json': {schema: getModelSchemaRef(Persona)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Email.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersonaInEmail',
            exclude: ['id'],
            optional: ['id_email']
          }),
        },
      },
    }) persona: Omit<Persona, 'id'>,
  ): Promise<Persona> {
    return this.emailRepository.persona(id).create(persona);
  }

  @patch('/emails/{id}/persona', {
    responses: {
      '200': {
        description: 'Email.Persona PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Partial<Persona>,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.emailRepository.persona(id).patch(persona, where);
  }

  @del('/emails/{id}/persona', {
    responses: {
      '200': {
        description: 'Email.Persona DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Persona)) where?: Where<Persona>,
  ): Promise<Count> {
    return this.emailRepository.persona(id).delete(where);
  }
}
