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
import {Fecha} from '../models';
import {FechaRepository} from '../repositories';

export class FechaController {
  constructor(
    @repository(FechaRepository)
    public fechaRepository : FechaRepository,
  ) {}

  @post('/fechas')
  @response(200, {
    description: 'Fecha model instance',
    content: {'application/json': {schema: getModelSchemaRef(Fecha)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fecha, {
            title: 'NewFecha',
            exclude: ['id'],
          }),
        },
      },
    })
    fecha: Omit<Fecha, 'id'>,
  ): Promise<Fecha> {
    return this.fechaRepository.create(fecha);
  }

  @get('/fechas/count')
  @response(200, {
    description: 'Fecha model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Fecha) where?: Where<Fecha>,
  ): Promise<Count> {
    return this.fechaRepository.count(where);
  }

  @get('/fechas')
  @response(200, {
    description: 'Array of Fecha model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Fecha, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Fecha) filter?: Filter<Fecha>,
  ): Promise<Fecha[]> {
    return this.fechaRepository.find(filter);
  }

  @patch('/fechas')
  @response(200, {
    description: 'Fecha PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fecha, {partial: true}),
        },
      },
    })
    fecha: Fecha,
    @param.where(Fecha) where?: Where<Fecha>,
  ): Promise<Count> {
    return this.fechaRepository.updateAll(fecha, where);
  }

  @get('/fechas/{id}')
  @response(200, {
    description: 'Fecha model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Fecha, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Fecha, {exclude: 'where'}) filter?: FilterExcludingWhere<Fecha>
  ): Promise<Fecha> {
    return this.fechaRepository.findById(id, filter);
  }

  @patch('/fechas/{id}')
  @response(204, {
    description: 'Fecha PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fecha, {partial: true}),
        },
      },
    })
    fecha: Fecha,
  ): Promise<void> {
    await this.fechaRepository.updateById(id, fecha);
  }

  @put('/fechas/{id}')
  @response(204, {
    description: 'Fecha PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() fecha: Fecha,
  ): Promise<void> {
    await this.fechaRepository.replaceById(id, fecha);
  }

  @del('/fechas/{id}')
  @response(204, {
    description: 'Fecha DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.fechaRepository.deleteById(id);
  }
}
