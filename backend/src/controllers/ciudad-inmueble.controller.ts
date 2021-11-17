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
  Ciudad,
  Inmueble,
} from '../models';
import {CiudadRepository} from '../repositories';

export class CiudadInmuebleController {
  constructor(
    @repository(CiudadRepository) protected ciudadRepository: CiudadRepository,
  ) { }

  @get('/ciudads/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Ciudad has one Inmueble',
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
    return this.ciudadRepository.inmueble(id).get(filter);
  }

  @post('/ciudads/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Ciudad model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudad.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInCiudad',
            exclude: ['id'],
            optional: ['id_ciudad']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.ciudadRepository.inmueble(id).create(inmueble);
  }

  @patch('/ciudads/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Ciudad.Inmueble PATCH success count',
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
    return this.ciudadRepository.inmueble(id).patch(inmueble, where);
  }

  @del('/ciudads/{id}/inmueble', {
    responses: {
      '200': {
        description: 'Ciudad.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.ciudadRepository.inmueble(id).delete(where);
  }
}
