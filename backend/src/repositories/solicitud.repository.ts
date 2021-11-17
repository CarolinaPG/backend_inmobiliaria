import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Fecha} from '../models';
import {FechaRepository} from './fecha.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly fechas: HasManyRepositoryFactory<Fecha, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FechaRepository') protected fechaRepositoryGetter: Getter<FechaRepository>,
  ) {
    super(Solicitud, dataSource);
    this.fechas = this.createHasManyRepositoryFactoryFor('fechas', fechaRepositoryGetter,);
    this.registerInclusionResolver('fechas', this.fechas.inclusionResolver);
  }
}
