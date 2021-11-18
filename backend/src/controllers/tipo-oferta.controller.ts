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
} from '@loopback/rest';
import {TipoOferta} from '../models';
import {TipoOfertaRepository} from '../repositories';

export class TipoOfertaController {
  constructor(
    @repository(TipoOfertaRepository)
    public tipoOfertaRepository : TipoOfertaRepository,
  ) {}

  @post('/tipo-ofertas')
  @response(200, {
    description: 'TipoOferta model instance',
    content: {'application/json': {schema: getModelSchemaRef(TipoOferta)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOferta, {
            title: 'NewTipoOferta',
            
          }),
        },
      },
    })
    tipoOferta: TipoOferta,
  ): Promise<TipoOferta> {
    return this.tipoOfertaRepository.create(tipoOferta);
  }

  @get('/tipo-ofertas/count')
  @response(200, {
    description: 'TipoOferta model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TipoOferta) where?: Where<TipoOferta>,
  ): Promise<Count> {
    return this.tipoOfertaRepository.count(where);
  }

  @get('/tipo-ofertas')
  @response(200, {
    description: 'Array of TipoOferta model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TipoOferta, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TipoOferta) filter?: Filter<TipoOferta>,
  ): Promise<TipoOferta[]> {
    return this.tipoOfertaRepository.find(filter);
  }

  @patch('/tipo-ofertas')
  @response(200, {
    description: 'TipoOferta PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOferta, {partial: true}),
        },
      },
    })
    tipoOferta: TipoOferta,
    @param.where(TipoOferta) where?: Where<TipoOferta>,
  ): Promise<Count> {
    return this.tipoOfertaRepository.updateAll(tipoOferta, where);
  }

  @get('/tipo-ofertas/{id}')
  @response(200, {
    description: 'TipoOferta model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TipoOferta, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TipoOferta, {exclude: 'where'}) filter?: FilterExcludingWhere<TipoOferta>
  ): Promise<TipoOferta> {
    return this.tipoOfertaRepository.findById(id, filter);
  }

  @patch('/tipo-ofertas/{id}')
  @response(204, {
    description: 'TipoOferta PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOferta, {partial: true}),
        },
      },
    })
    tipoOferta: TipoOferta,
  ): Promise<void> {
    await this.tipoOfertaRepository.updateById(id, tipoOferta);
  }

  @put('/tipo-ofertas/{id}')
  @response(204, {
    description: 'TipoOferta PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tipoOferta: TipoOferta,
  ): Promise<void> {
    await this.tipoOfertaRepository.replaceById(id, tipoOferta);
  }

  @del('/tipo-ofertas/{id}')
  @response(204, {
    description: 'TipoOferta DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tipoOfertaRepository.deleteById(id);
  }
}
