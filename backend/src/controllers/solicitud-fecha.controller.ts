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
  Solicitud,
  Fecha,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudFechaController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/fechas', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many Fecha',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Fecha)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Fecha>,
  ): Promise<Fecha[]> {
    return this.solicitudRepository.fechas(id).find(filter);
  }

  @post('/solicituds/{id}/fechas', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(Fecha)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fecha, {
            title: 'NewFechaInSolicitud',
            exclude: ['id'],
            optional: ['id_solicitud']
          }),
        },
      },
    }) fecha: Omit<Fecha, 'id'>,
  ): Promise<Fecha> {
    return this.solicitudRepository.fechas(id).create(fecha);
  }

  @patch('/solicituds/{id}/fechas', {
    responses: {
      '200': {
        description: 'Solicitud.Fecha PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Fecha, {partial: true}),
        },
      },
    })
    fecha: Partial<Fecha>,
    @param.query.object('where', getWhereSchemaFor(Fecha)) where?: Where<Fecha>,
  ): Promise<Count> {
    return this.solicitudRepository.fechas(id).patch(fecha, where);
  }

  @del('/solicituds/{id}/fechas', {
    responses: {
      '200': {
        description: 'Solicitud.Fecha DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Fecha)) where?: Where<Fecha>,
  ): Promise<Count> {
    return this.solicitudRepository.fechas(id).delete(where);
  }
}
