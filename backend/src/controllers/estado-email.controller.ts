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
  Estado,
  Email,
} from '../models';
import {EstadoRepository} from '../repositories';

export class EstadoEmailController {
  constructor(
    @repository(EstadoRepository) protected estadoRepository: EstadoRepository,
  ) { }

  @get('/estados/{id}/email', {
    responses: {
      '200': {
        description: 'Estado has one Email',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Email),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Email>,
  ): Promise<Email> {
    return this.estadoRepository.email(id).get(filter);
  }

  @post('/estados/{id}/email', {
    responses: {
      '200': {
        description: 'Estado model instance',
        content: {'application/json': {schema: getModelSchemaRef(Email)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Estado.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Email, {
            title: 'NewEmailInEstado',
            exclude: ['id'],
            optional: ['id_estado']
          }),
        },
      },
    }) email: Omit<Email, 'id'>,
  ): Promise<Email> {
    return this.estadoRepository.email(id).create(email);
  }

  @patch('/estados/{id}/email', {
    responses: {
      '200': {
        description: 'Estado.Email PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Email, {partial: true}),
        },
      },
    })
    email: Partial<Email>,
    @param.query.object('where', getWhereSchemaFor(Email)) where?: Where<Email>,
  ): Promise<Count> {
    return this.estadoRepository.email(id).patch(email, where);
  }

  @del('/estados/{id}/email', {
    responses: {
      '200': {
        description: 'Estado.Email DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Email)) where?: Where<Email>,
  ): Promise<Count> {
    return this.estadoRepository.email(id).delete(where);
  }
}
