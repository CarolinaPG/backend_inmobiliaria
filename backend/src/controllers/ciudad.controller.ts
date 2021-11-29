import { authenticate } from '@loopback/authentication';
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
import {Ciudad} from '../models';
import {CiudadRepository, DepartamentoRepository} from '../repositories';

//@authenticate("admin")
export class CiudadController {
  constructor(
    @repository(CiudadRepository)
    public ciudadRepository : CiudadRepository,

    @repository(DepartamentoRepository)
    public departamentoRepository : DepartamentoRepository,

  ) {}

  @post('/ciudades')
  @response(200, {
    description: 'Ciudad model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudad',
            
          }),
        },
      },
    })
    ciudad: Ciudad,
  ): Promise<Ciudad> {
    if(ciudad.id_depa){
      let depa = await this.departamentoRepository.findById(ciudad.id_depa);
      if(depa){
        return this.ciudadRepository.create(ciudad);
      } else {
        throw new HttpErrors[401]("Primero debe registrar el departamento antes de registrar la ciudad.")
      }
    } else {
      throw new HttpErrors[401]("Debe agregar el departamento.")
    }
  }

  @get('/ciudades/count')
  @response(200, {
    description: 'Ciudad model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.count(where);
  }

  @get('/ciudades')
  @response(200, {
    description: 'Array of Ciudad model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ciudad, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ciudad) filter?: Filter<Ciudad>,
  ): Promise<Ciudad[]> {
    return this.ciudadRepository.find(filter);
  }

  @patch('/ciudades')
  @response(200, {
    description: 'Ciudad PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
    @param.where(Ciudad) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.ciudadRepository.updateAll(ciudad, where);
  }

  @get('/ciudades/{id}')
  @response(200, {
    description: 'Ciudad model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ciudad, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    //@param.filter(Ciudad, {exclude: 'where'}) filter?: FilterExcludingWhere<Ciudad>
  ): Promise<Ciudad> {
    return this.ciudadRepository.findById(id);
    //return this.ciudadRepository.findById(id, filter);
  }

  @patch('/ciudades/{id}')
  @response(204, {
    description: 'Ciudad PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Ciudad,
  ): Promise<void> {
    if(ciudad.id_depa){
      let depa = await this.departamentoRepository.findById(ciudad.id_depa);
      if(depa){
        await this.ciudadRepository.updateById(id, ciudad);
      } else {
        throw new HttpErrors[401]("El departamento no ha sido registrado aún. Primero registre el departamento.")
      }
    } else {
      await this.ciudadRepository.updateById(id, ciudad);
    }
  }

  @put('/ciudades/{id}')
  @response(204, {
    description: 'Ciudad PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ciudad: Ciudad,
  ): Promise<void> {
    await this.ciudadRepository.replaceById(id, ciudad);
  }

  @del('/ciudades/{id}')
  @response(204, {
    description: 'Ciudad DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ciudadRepository.deleteById(id);
  }
}
