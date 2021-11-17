import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Inmueble,
  Rol,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleRolController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Rol> {
    return this.inmuebleRepository.rolPersona(id);
  }
}
