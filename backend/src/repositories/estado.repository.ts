import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Estado, EstadoRelations, Inmueble, Solicitud} from '../models';
import {InmuebleRepository} from './inmueble.repository';
import {SolicitudRepository} from './solicitud.repository';

export class EstadoRepository extends DefaultCrudRepository<
  Estado,
  typeof Estado.prototype.id,
  EstadoRelations
> {

  public readonly inmueble: HasOneRepositoryFactory<Inmueble, typeof Estado.prototype.id>;

  public readonly solicitud: HasOneRepositoryFactory<Solicitud, typeof Estado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Estado, dataSource);
    this.solicitud = this.createHasOneRepositoryFactoryFor('solicitud', solicitudRepositoryGetter);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.inmueble = this.createHasOneRepositoryFactoryFor('inmueble', inmuebleRepositoryGetter);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
