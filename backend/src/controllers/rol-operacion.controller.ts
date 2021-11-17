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
Rol,
RolOp,
Operacion,
} from '../models';
import {RolRepository} from '../repositories';

export class RolOperacionController {
  constructor(
    @repository(RolRepository) protected rolRepository: RolRepository,
  ) { }

  @get('/rols/{id}/operacions', {
    responses: {
      '200': {
        description: 'Array of Rol has many Operacion through RolOp',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Operacion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Operacion>,
  ): Promise<Operacion[]> {
    return this.rolRepository.operaciones(id).find(filter);
  }

  @post('/rols/{id}/operacions', {
    responses: {
      '200': {
        description: 'create a Operacion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Operacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Rol.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operacion, {
            title: 'NewOperacionInRol',
            exclude: ['id'],
          }),
        },
      },
    }) operacion: Omit<Operacion, 'id'>,
  ): Promise<Operacion> {
    return this.rolRepository.operaciones(id).create(operacion);
  }

  @patch('/rols/{id}/operacions', {
    responses: {
      '200': {
        description: 'Rol.Operacion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operacion, {partial: true}),
        },
      },
    })
    operacion: Partial<Operacion>,
    @param.query.object('where', getWhereSchemaFor(Operacion)) where?: Where<Operacion>,
  ): Promise<Count> {
    return this.rolRepository.operaciones(id).patch(operacion, where);
  }

  @del('/rols/{id}/operacions', {
    responses: {
      '200': {
        description: 'Rol.Operacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Operacion)) where?: Where<Operacion>,
  ): Promise<Count> {
    return this.rolRepository.operaciones(id).delete(where);
  }
}
