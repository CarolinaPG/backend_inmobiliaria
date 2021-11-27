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
  Email,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaEmailController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/email', {
    responses: {
      '200': {
        description: 'Email belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Email)},
          },
        },
      },
    },
  })
  async getEmail(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Email> {
    return this.personaRepository.email(id);
  }
}
