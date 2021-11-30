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
import {FormularioInmueble, Inmueble} from '../models';
import {InmuebleRepository} from '../repositories';
import { NotificacionService, RegistroService } from '../services';

export class InmuebleController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository : InmuebleRepository,

    @service(NotificacionService)
    public notificacionService : NotificacionService,

    @service(RegistroService)
    public registroService : RegistroService,
    
  ) {}

/**
  @get('/inmuebles/tipo-oferta/{tipoOferta}')
  @response(200, {
    description: 'Inmueble model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inmueble, {includeRelations: true}),
      },
    },
  })
  async findByTipoOferta(
    @param.path.string('id') id: string,
    @param.filter(Inmueble, {exclude: 'where'}) filter?: FilterExcludingWhere<Inmueble>
  ): Promise<Inmueble> {
    return this.inmuebleRepository.findById(id, filter);
  }
*/

  @post('/inmuebles')
  @response(200, {
    description: 'FormularioInmueble model instance',
    content: {'application/json': {schema: getModelSchemaRef(FormularioInmueble)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioInmueble, {
            title: 'NewInmueble',
            
          }),
        },
      },
    })
    formulario: FormularioInmueble,
  ): Promise<Inmueble> {
    if(await this.registroService.ValidarDatosInmueble(formulario)){
      try{
        return await this.registroService.RegistrarInmueble(formulario);
      } catch (e){
        throw new HttpErrors[401]("Error creando el inmueble");
      }
    } else {
      throw new HttpErrors[401]("Datos ingresados son incorrectos");
    }
    //return this.inmuebleRepository.create(inmueble);
  }

  @get('/inmuebles/count')
  @response(200, {
    description: 'Inmueble model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Inmueble) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.inmuebleRepository.count(where);
  }

  @get('/inmuebles')
  @response(200, {
    description: 'Array of Inmueble model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Inmueble, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Inmueble) filter?: Filter<Inmueble>,
  ): Promise<Inmueble[]> {
    return this.inmuebleRepository.find(filter);
  }

  @patch('/inmuebles')
  @response(200, {
    description: 'Inmueble PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Inmueble,
    @param.where(Inmueble) where?: Where<Inmueble>,
  ): Promise<Count> {
    return this.inmuebleRepository.updateAll(inmueble, where);
  }

  @get('/inmuebles/{id}')
  @response(200, {
    description: 'Inmueble model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inmueble, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Inmueble, {exclude: 'where'}) filter?: FilterExcludingWhere<Inmueble>
  ): Promise<Inmueble> {
    return this.inmuebleRepository.findById(id, filter);
  }

  @patch('/inmuebles/{id}')
  @response(204, {
    description: 'Inmueble PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(FormularioInmueble, {partial: true}),
        },
      },
    })
    formulario: FormularioInmueble,
  ): Promise <void>{
    let i = await this.inmuebleRepository.findById(id);
    let inmueble: Inmueble = new Inmueble();
    if(formulario.codigo)
      inmueble.codigo = formulario.codigo;
    else
      inmueble.codigo = i.codigo;
    if(formulario.direccion)
      inmueble.direccion = formulario.direccion;
    else
      inmueble.direccion = i.direccion;
    if(formulario.valor)
      inmueble.valor = formulario.valor;
    else
      inmueble.valor = i.valor;
    if(formulario.fotografia)
      inmueble.fotografia = formulario.fotografia;
    else
      inmueble.fotografia = i.fotografia;
    if(formulario.videoYoutube)
      inmueble.videoYoutube = formulario.videoYoutube;
    else
      inmueble.videoYoutube = i.videoYoutube;
    if(formulario.estado)
      inmueble.id_estado = formulario.estado;
    else
      inmueble.id_estado = i.id_estado;
    if(formulario.tipoIn)
      inmueble.id_tipoIn = formulario.tipoIn;
    else
      inmueble.id_tipoIn = i.id_tipoIn;
    if(formulario.tipoOf)
      inmueble.id_tipoOf = formulario.tipoOf;
    else
      inmueble.id_tipoOf = i.id_tipoOf;
    if(formulario.ciudad)
      inmueble.id_ciudad = formulario.ciudad;
    else
      inmueble.id_ciudad = i.id_ciudad;
    if(formulario.asesor)
      inmueble.id_asesor = formulario.asesor;
    else
      inmueble.id_asesor = i.id_asesor;
    await this.inmuebleRepository.updateById(id, inmueble);
  }

  @put('/inmuebles/{id}')
  @response(204, {
    description: 'Inmueble PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inmueble: Inmueble,
  ): Promise<void> {
    await this.inmuebleRepository.replaceById(id, inmueble);
  }

  @del('/inmuebles/{id}')
  @response(204, {
    description: 'Inmueble DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inmuebleRepository.deleteById(id);
  }
}
