import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Fecha, Documento, Estado, Persona, Inmueble} from '../models';
import {FechaRepository} from './fecha.repository';
import {DocumentoRepository} from './documento.repository';
import {EstadoRepository} from './estado.repository';
import {PersonaRepository} from './persona.repository';
import {InmuebleRepository} from './inmueble.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {

  public readonly fechas: HasManyRepositoryFactory<Fecha, typeof Solicitud.prototype.id>;

  public readonly documentos: HasManyRepositoryFactory<Documento, typeof Solicitud.prototype.id>;

  public readonly estado: BelongsToAccessor<Estado, typeof Solicitud.prototype.id>;

  public readonly cliente: BelongsToAccessor<Persona, typeof Solicitud.prototype.id>;

  public readonly predio: BelongsToAccessor<Inmueble, typeof Solicitud.prototype.id>;
  
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('FechaRepository') protected fechaRepositoryGetter: Getter<FechaRepository>, @repository.getter('DocumentoRepository') protected documentoRepositoryGetter: Getter<DocumentoRepository>, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, 
  ) {
    super(Solicitud, dataSource);
    this.predio = this.createBelongsToAccessorFor('predio', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('predio', this.predio.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', personaRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
    this.estado = this.createBelongsToAccessorFor('estado', estadoRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
    this.documentos = this.createHasManyRepositoryFactoryFor('documentos', documentoRepositoryGetter,);
    this.registerInclusionResolver('documentos', this.documentos.inclusionResolver);
    this.fechas = this.createHasManyRepositoryFactoryFor('fechas', fechaRepositoryGetter,);
    this.registerInclusionResolver('fechas', this.fechas.inclusionResolver);
  }
}
