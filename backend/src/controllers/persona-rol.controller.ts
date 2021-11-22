import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Rol,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaRolController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/rol', {
    responses: {
      '200': {
        description: 'Rol belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Rol)},
          },
        },
      },
    },
  })
  async getRol(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Rol> {
    return this.personaRepository.rol(id);
  }
}
