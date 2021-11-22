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
import {Inmueble} from '../models';
import {InmuebleRepository, PersonaRepository} from '../repositories';

export class InmuebleController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository : InmuebleRepository,
    @repository(PersonaRepository)
    public personaRepository : PersonaRepository,
  ) {}

  @post('/inmuebles')
  @response(200, {
    description: 'Inmueble model instance',
    content: {'application/json': {schema: getModelSchemaRef(Inmueble)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmueble, {
            title: 'NewInmueble',
            
          }),
        },
      },
    })
    inmueble: Inmueble,
  ): Promise<Inmueble> {
    console.log("************************************")
    console.log(inmueble.id);
    let existeId = await this.inmuebleRepository.findOne({where: {id: inmueble.id}});
    if(!existeId){
      let existeAsesor = await this.personaRepository.findOne({where: {id: inmueble.id_asesor, id_rol: 2}});
      if(!existeAsesor){
        let i = await this.inmuebleRepository.create({
          "id": inmueble.id,
          "direccion": inmueble.direccion,
          "valor": inmueble.valor,
          "fotografia": inmueble.fotografia,
          "id_asesor": inmueble.id_asesor,
          "id_ciudad": inmueble.id_ciudad,
          "id_estado": inmueble.id_estado,
          "id_tipoInmueble": inmueble.id_tipoInmueble,
          "id_tipoOferta": inmueble.id_tipoOferta
        });
        //Notificar al asesor encargado
        //this.servicioNotificacion.NotificarAsesorEncargado(persona, clave);
        return i;
      } else {
        throw new HttpErrors[401]("La persona encargada no es un asesor registrado.");
      } 
    //return this.personaRepository.create(persona);
    } else {
      throw new HttpErrors[401]("Ya existe un inmueble registrado con ese código.");
    } 
  }
    //return this.inmuebleRepository.create(inmueble);

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
          schema: getModelSchemaRef(Inmueble, {partial: true}),
        },
      },
    })
    inmueble: Inmueble,
  ): Promise<void> {
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
