import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Documento, Fecha} from '../models';
import {DocumentoRepository, FechaRepository} from '../repositories';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly documentos: HasManyRepositoryFactory<Documento, typeof Solicitud.prototype.id>;
  public readonly fechas: HasManyRepositoryFactory<Fecha, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>, @repository.getter('FechaRepository') protected fechaRepositoryGetter: Getter<FechaRepository>,
  ) {
    super(Solicitud, dataSource);
    this.documentos = this.createHasManyRepositoryFactoryFor('documentos', documentoRepositoryGetter,);
    this.registerInclusionResolver('documentos', this.documentos.inclusionResolver);
    this.fechas = this.createHasManyRepositoryFactoryFor('fechas', fechaRepositoryGetter,);
    this.registerInclusionResolver('fechas', this.fechas.inclusionResolver);
  }
}
