import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoOferta, TipoOfertaRelations, Inmueble} from '../models';
import {InmuebleRepository} from './inmueble.repository';

export class TipoOfertaRepository extends DefaultCrudRepository<
  TipoOferta,
  typeof TipoOferta.prototype.id,
  TipoOfertaRelations
> {

  public readonly inmueble: HasOneRepositoryFactory<Inmueble, typeof TipoOferta.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(TipoOferta, dataSource);
    this.inmueble = this.createHasOneRepositoryFactoryFor('inmueble', inmuebleRepositoryGetter);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
