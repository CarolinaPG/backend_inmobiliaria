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
import {RolOp} from '../models';
import {RolOpRepository} from '../repositories';

export class RolOpController {
  constructor(
    @repository(RolOpRepository)
    public rolOpRepository : RolOpRepository,
  ) {}

  @post('/rol-ops')
  @response(200, {
    description: 'RolOp model instance',
    content: {'application/json': {schema: getModelSchemaRef(RolOp)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolOp, {
            title: 'NewRolOp',
            exclude: ['id'],
          }),
        },
      },
    })
    rolOp: Omit<RolOp, 'id'>,
  ): Promise<RolOp> {
    return this.rolOpRepository.create(rolOp);
  }

  @get('/rol-ops/count')
  @response(200, {
    description: 'RolOp model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RolOp) where?: Where<RolOp>,
  ): Promise<Count> {
    return this.rolOpRepository.count(where);
  }

  @get('/rol-ops')
  @response(200, {
    description: 'Array of RolOp model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RolOp, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RolOp) filter?: Filter<RolOp>,
  ): Promise<RolOp[]> {
    return this.rolOpRepository.find(filter);
  }

  @patch('/rol-ops')
  @response(200, {
    description: 'RolOp PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolOp, {partial: true}),
        },
      },
    })
    rolOp: RolOp,
    @param.where(RolOp) where?: Where<RolOp>,
  ): Promise<Count> {
    return this.rolOpRepository.updateAll(rolOp, where);
  }

  @get('/rol-ops/{id}')
  @response(200, {
    description: 'RolOp model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RolOp, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(RolOp, {exclude: 'where'}) filter?: FilterExcludingWhere<RolOp>
  ): Promise<RolOp> {
    return this.rolOpRepository.findById(id, filter);
  }

  @patch('/rol-ops/{id}')
  @response(204, {
    description: 'RolOp PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RolOp, {partial: true}),
        },
      },
    })
    rolOp: RolOp,
  ): Promise<void> {
    await this.rolOpRepository.updateById(id, rolOp);
  }

  @put('/rol-ops/{id}')
  @response(204, {
    description: 'RolOp PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() rolOp: RolOp,
  ): Promise<void> {
    await this.rolOpRepository.replaceById(id, rolOp);
  }

  @del('/rol-ops/{id}')
  @response(204, {
    description: 'RolOp DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.rolOpRepository.deleteById(id);
  }
}
