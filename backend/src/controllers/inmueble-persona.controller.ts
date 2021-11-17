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
  Persona,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmueblePersonaController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/persona', {
    responses: {
      '200': {
        description: 'Persona belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Persona)},
          },
        },
      },
    },
  })
  async getPersona(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<Persona> {
    return this.inmuebleRepository.asesor(id);
  }
}
