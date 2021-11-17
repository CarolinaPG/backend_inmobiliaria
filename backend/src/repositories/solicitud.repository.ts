import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Fecha, Documento, Estado} from '../models';
import {FechaRepository} from './fecha.repository';
import {DocumentoRepository} from './documento.repository';
import {EstadoRepository} from './estado.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly fechas: HasManyRepositoryFactory<Fecha, typeof Solicitud.prototype.id>;

  public readonly documentos: HasManyRepositoryFactory<Documento, typeof Solicitud.prototype.id>;

  public readonly estSolicitud: BelongsToAccessor<Estado, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FechaRepository') protected fechaRepositoryGetter: Getter<FechaRepository>, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.estSolicitud = this.createBelongsToAccessorFor('estSolicitud', estadoRepositoryGetter,);
    this.registerInclusionResolver('estSolicitud', this.estSolicitud.inclusionResolver);
    this.documentos = this.createHasManyRepositoryFactoryFor('documentos', documentoRepositoryGetter,);
    this.registerInclusionResolver('documentos', this.documentos.inclusionResolver);
    this.fechas = this.createHasManyRepositoryFactoryFor('fechas', fechaRepositoryGetter,);
    this.registerInclusionResolver('fechas', this.fechas.inclusionResolver);
  }
}
