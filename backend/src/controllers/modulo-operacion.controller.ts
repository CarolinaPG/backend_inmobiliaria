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
  Modulo,
  Operacion,
} from '../models';
import {ModuloRepository} from '../repositories';

export class ModuloOperacionController {
  constructor(
    @repository(ModuloRepository) protected moduloRepository: ModuloRepository,
  ) { }

  @get('/modulos/{id}/operacions', {
    responses: {
      '200': {
        description: 'Array of Modulo has many Operacion',
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
    return this.moduloRepository.modOperaciones(id).find(filter);
  }

  @post('/modulos/{id}/operacions', {
    responses: {
      '200': {
        description: 'Modulo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Operacion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Modulo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Operacion, {
            title: 'NewOperacionInModulo',
            exclude: ['id'],
            optional: ['id_modulo']
          }),
        },
      },
    }) operacion: Omit<Operacion, 'id'>,
  ): Promise<Operacion> {
    return this.moduloRepository.modOperaciones(id).create(operacion);
  }

  @patch('/modulos/{id}/operacions', {
    responses: {
      '200': {
        description: 'Modulo.Operacion PATCH success count',
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
    return this.moduloRepository.modOperaciones(id).patch(operacion, where);
  }

  @del('/modulos/{id}/operacions', {
    responses: {
      '200': {
        description: 'Modulo.Operacion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Operacion)) where?: Where<Operacion>,
  ): Promise<Count> {
    return this.moduloRepository.modOperaciones(id).delete(where);
  }
}
