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
  TipoOferta,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleTipoOfertaController {
  constructor(
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'TipoOferta belonging to Inmueble',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoOferta)},
          },
        },
      },
    },
  })
  async getTipoOferta(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
  ): Promise<TipoOferta> {
    return this.inmuebleRepository.tipoO(id);
  }
}
