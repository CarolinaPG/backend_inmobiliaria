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
  TipoOferta,
  Inmueble,
} from '../models';
import {TipoOfertaRepository} from '../repositories';

export class TipoOfertaInmuebleController {
  constructor(
    @repository(TipoOfertaRepository) protected tipoOfertaRepository: TipoOfertaRepository,
  ) { }

  @get('/tipo-ofertas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'TipoOferta has one Inmueble',
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
    return this.tipoOfertaRepository.inmueble(id).get(filter);
  }

  @post('/tipo-ofertas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'TipoOferta model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TipoOferta.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmuebleInTipoOferta',
            exclude: ['id'],
            optional: ['id_tipoOferta']
          }),
        },
      },
    }) inmueble: Omit<Inmueble, 'id'>,
  ): Promise<Inmueble> {
    return this.tipoOfertaRepository.inmueble(id).create(inmueble);
  }

  @patch('/tipo-ofertas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'TipoOferta.Inmueble PATCH success count',
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
    return this.tipoOfertaRepository.inmueble(id).patch(inmueble, where);
  }

  @del('/tipo-ofertas/{id}/inmueble', {
    responses: {
      '200': {
        description: 'TipoOferta.Inmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Inmueble)) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.tipoOfertaRepository.inmueble(id).delete(where);
  }
}
