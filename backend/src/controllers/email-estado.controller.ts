import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Email,
  Estado,
} from '../models';
import {EmailRepository} from '../repositories';

export class EmailEstadoController {
  constructor(
    @repository(EmailRepository)
    public emailRepository: EmailRepository,
  ) { }

  @get('/emails/{id}/estado', {
    responses: {
      '200': {
        description: 'Estado belonging to Email',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estado)},
          },
        },
      },
    },
  })
  async getEstado(
    @param.path.string('id') id: typeof Email.prototype.id,
  ): Promise<Estado> {
    return this.emailRepository.estEmail(id);
  }
}
