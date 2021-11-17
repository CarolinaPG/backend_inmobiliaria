import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Estado, EstadoRelations, Email, Inmueble, Solicitud} from '../models';
import {EmailRepository, InmuebleRepository, SolicitudRepository} from '../repositories';
//import {EmailRepository} from './email.repository';
//import {InmuebleRepository} from './inmueble.repository';
//import {SolicitudRepository} from './solicitud.repository';

export class EstadoRepository extends DefaultCrudRepository<
  Estado,
  typeof Estado.prototype.id,
  EstadoRelations
> {

  public readonly email: HasOneRepositoryFactory<Email, typeof Estado.prototype.id>;

  public readonly inmueble: HasOneRepositoryFactory<Inmueble, typeof Estado.prototype.id>;

  public readonly solicitud: HasOneRepositoryFactory<Solicitud, typeof Estado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmailRepository') protected emailRepositoryGetter: Getter<EmailRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(Estado, dataSource);
    this.email = this.createHasOneRepositoryFactoryFor('email', emailRepositoryGetter);
    this.registerInclusionResolver('email', this.email.inclusionResolver);
    this.solicitud = this.createHasOneRepositoryFactoryFor('solicitud', solicitudRepositoryGetter);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
    this.inmueble = this.createHasOneRepositoryFactoryFor('inmueble', inmuebleRepositoryGetter);
    this.registerInclusionResolver('inmueble', this.inmueble.inclusionResolver);
  }
}
