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
import {Modulo} from '../models';
import {ModuloRepository} from '../repositories';

export class ModuloController {
  constructor(
    @repository(ModuloRepository)
    public moduloRepository : ModuloRepository,
  ) {}

  @post('/modulos')
  @response(200, {
    description: 'Modulo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Modulo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modulo, {
            title: 'NewModulo',
            
          }),
        },
      },
    })
    modulo: Modulo,
  ): Promise<Modulo> {
    return this.moduloRepository.create(modulo);
  }

  @get('/modulos/count')
  @response(200, {
    description: 'Modulo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Modulo) where?: Where<Modulo>,
  ): Promise<Count> {
    return this.moduloRepository.count(where);
  }

  @get('/modulos')
  @response(200, {
    description: 'Array of Modulo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Modulo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Modulo) filter?: Filter<Modulo>,
  ): Promise<Modulo[]> {
    return this.moduloRepository.find(filter);
  }

  @patch('/modulos')
  @response(200, {
    description: 'Modulo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modulo, {partial: true}),
        },
      },
    })
    modulo: Modulo,
    @param.where(Modulo) where?: Where<Modulo>,
  ): Promise<Count> {
    return this.moduloRepository.updateAll(modulo, where);
  }

  @get('/modulos/{id}')
  @response(200, {
    description: 'Modulo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Modulo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Modulo, {exclude: 'where'}) filter?: FilterExcludingWhere<Modulo>
  ): Promise<Modulo> {
    return this.moduloRepository.findById(id, filter);
  }

  @patch('/modulos/{id}')
  @response(204, {
    description: 'Modulo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Modulo, {partial: true}),
        },
      },
    })
    modulo: Modulo,
  ): Promise<void> {
    await this.moduloRepository.updateById(id, modulo);
  }

  @put('/modulos/{id}')
  @response(204, {
    description: 'Modulo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() modulo: Modulo,
  ): Promise<void> {
    await this.moduloRepository.replaceById(id, modulo);
  }

  @del('/modulos/{id}')
  @response(204, {
    description: 'Modulo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.moduloRepository.deleteById(id);
  }
}
