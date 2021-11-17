import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Documento} from '../models';
import {DocumentoRepository} from './documento.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly documentos: HasManyRepositoryFactory<Documento, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.documentos = this.createHasManyRepositoryFactoryFor('documentos', documentoRepositoryGetter,);
    this.registerInclusionResolver('documentos', this.documentos.inclusionResolver);
  }
}
