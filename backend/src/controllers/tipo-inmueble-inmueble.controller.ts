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
  TipoInmueble,
  Inmueble,
} from '../models';
import {TipoInmuebleRepository} from '../repositories';

export class TipoInmuebleInmuebleController {
  constructor(
    @repository(TipoInmuebleRepository) protected tipoInmuebleRepository: TipoInmuebleRepository,
  ) { }

  @get('/tipo-inmuebles/{id}/inmueble', {
    responses: {
      '200': {
        description: 'TipoInmueble has one Inmueble',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Inmueble),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Inmueble>,
  ): Promise<Inmueble> {
    return this.tipoInmuebleRepository.inmueble(id).get(filter);
  }

  @post('/tipo-inmuebles/{id}/inmueble', {
    responses: {
      '200': {
        description: 'TipoInmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoInmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInTipoInmueble',
            exclude: ['id'],
            optional: ['id_tipoInmueble']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.tipoInmuebleRepository.inmueble(id).create(inmueble);
  }

  @patch('/tipo-inmuebles/{id}/inmueble', {
    responses: {
      '200': {
        description: 'TipoInmueble.Inmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
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
    return this.tipoInmuebleRepository.inmueble(id).patch(inmueble, where);
  }

  @del('/tipo-inmuebles/{id}/inmueble', {
    responses: {
      '200': {
        description: 'TipoInmueble.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.tipoInmuebleRepository.inmueble(id).delete(where);
  }
}
