import { service } from '@loopback/core';
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
  HttpErrors,
} from '@loopback/rest';
import {Documento, Fecha, FormularioSolicitud, Solicitud} from '../models';
import {DocumentoRepository, FechaRepository, SolicitudRepository} from '../repositories';
import { RegistroService, NotificacionService } from '../services';

export class SolicitudController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository : SolicitudRepository,

    @repository(FechaRepository)
    public fechaRepository : FechaRepository,

    @repository(DocumentoRepository)
    public documentoRepository : FechaRepository,

    @service(RegistroService)
    public registroService : RegistroService,

    @service(NotificacionService)
    public notificacionService : NotificacionService,
    
  ) {}

  @post('/solicitudes')
  @response(200, {
    description: 'Solicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(FormularioSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioSolicitud, {
            title: 'NewSolicitud',
            //exclude: ['id'],
          }),
        },
      },
    })
    formulario: FormularioSolicitud,
  ): Promise<Solicitud> {
    if(await this.registroService.ValidarDatosSolicitud(formulario)){
      let existe = await this.solicitudRepository.find({where: {id_cliente: formulario.id_cliente, id_inmueble: formulario.id_inmueble}});
      if(existe.length == 0){
        let solicitud: Solicitud = await this.registroService.RegistrarSolicitud(formulario);
        
        let fechas: Fecha [] = new Array ();
        formulario.fechas.forEach(element => {
          let f: Fecha = new Fecha();
          f.fecha = element;
          f.id_solicitud = solicitud.id;
          fechas.push(f);
        });
        fechas.forEach(element => {
          this.fechaRepository.create(element);
        });

        await this.notificacionService.NotificarSolicitudEnviada(solicitud);
        
        return solicitud;
      } else {
        throw new HttpErrors[401]("El cliente ya tiene registrada una solicitud para ese inmueble");
      }
    } else {
      throw new HttpErrors[401]("Error en los datos ingresados");
    }
    //return this.solicitudRepository.create(solicitud);
  }

  @get('/solicitudes/count')
  @response(200, {
    description: 'Solicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.count(where);
  }

  @get('/solicitudes')
  @response(200, {
    description: 'Array of Solicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solicitud) filter?: Filter<Solicitud>,
  ): Promise<Solicitud[]> {
    return this.solicitudRepository.find(filter ? filter: { include:[
      //{relation: 'fechas'},
      //{relation: 'documentos'},
      //{relation: 'estado'},
      {relation: 'cliente'},
      {relation: 'predio'},
    ]});
  }

  @patch('/solicitudes')
  @response(200, {
    description: 'Solicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitud, {partial: true}),
        },
      },
    })
    solicitud: Solicitud,
    @param.where(Solicitud) where?: Where<Solicitud>,
  ): Promise<Count> {
    return this.solicitudRepository.updateAll(solicitud, where);
  }

  @get('/solicitudes/{id}')
  @response(200, {
    description: 'Solicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Solicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<Solicitud>
  ): Promise<Solicitud> {
    return this.solicitudRepository.findById(id, filter);
  }

  @patch('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioSolicitud, {partial: true}),
        },
      },
    })
    formulario: FormularioSolicitud,
  ): Promise<void> {
    let s = await this.solicitudRepository.findById(id);
    let solicitud: Solicitud = new Solicitud();
    if(formulario.comentarios)
      solicitud.comentarios = formulario.comentarios;
    else
      solicitud.comentarios = s.comentarios;
    if(formulario.cliente)
      solicitud.id_cliente = formulario.id_cliente;
    else
      solicitud.id_cliente = s.id_cliente;
    if(formulario.inmueble)
      solicitud.id_inmueble = formulario.id_inmueble;
    else
      solicitud.id_inmueble = s.id_inmueble;
    if(formulario.id_estado)
      solicitud.id_estado = formulario.id_estado;
    else
      solicitud.id_estado = s.id_estado;

    if(formulario.fechas && formulario.fechas.length != 0){
      let fechas = await this.fechaRepository.find({where: {id_solicitud: id}});
      fechas.forEach(element => {
        this.fechaRepository.deleteById(element.id);
      }); 
      formulario.fechas.forEach(element => {
        let f: Fecha = new Fecha();
        f.fecha = element;
        f.id_solicitud = solicitud.id;
        this.fechaRepository.create(f);
      });
    }

    await this.solicitudRepository.updateById(id, solicitud);
  }

  @put('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitud: Solicitud,
  ): Promise<void> {
    await this.solicitudRepository.replaceById(id, solicitud);
  }

  @del('/solicitudes/{id}')
  @response(204, {
    description: 'Solicitud DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    let fechas = await this.fechaRepository.find({where: {id_solicitud: id}});
    fechas.forEach(element => {
      this.fechaRepository.deleteById(element.id);
    });
    let docs = await this.documentoRepository.find({where: {id_solicitud: id}});
    docs.forEach(element => {
      this.documentoRepository.deleteById(element.id);
    });

    await this.solicitudRepository.deleteById(id);
  }
}
