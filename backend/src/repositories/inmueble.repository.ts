import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Estado, TipoInmueble, TipoOferta, Ciudad, Persona} from '../models';
import {EstadoRepository} from './estado.repository';
import {TipoInmuebleRepository} from './tipo-inmueble.repository';
import {TipoOfertaRepository} from './tipo-oferta.repository';
import {CiudadRepository} from './ciudad.repository';
import {PersonaRepository} from './persona.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly estado: BelongsToAccessor<Estado, typeof Inmueble.prototype.id>;

  public readonly tipoIn: BelongsToAccessor<TipoInmueble, typeof Inmueble.prototype.id>;

  public readonly tipoO: BelongsToAccessor<TipoOferta, typeof Inmueble.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Inmueble.prototype.id>;

  public readonly asesor: BelongsToAccessor<Persona, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>, @repository.getter('TipoInmuebleRepository') protected tipoInmuebleRepositoryGetter: Getter<TipoInmuebleRepository>, @repository.getter('TipoOfertaRepository') protected tipoOfertaRepositoryGetter: Getter<TipoOfertaRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Inmueble, dataSource);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', personaRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.tipoO = this.createBelongsToAccessorFor('tipoO', tipoOfertaRepositoryGetter,);
    this.registerInclusionResolver('tipoO', this.tipoO.inclusionResolver);
    this.tipoIn = this.createBelongsToAccessorFor('tipoIn', tipoInmuebleRepositoryGetter,);
    this.registerInclusionResolver('tipoIn', this.tipoIn.inclusionResolver);
    this.estado = this.createBelongsToAccessorFor('estado', estadoRepositoryGetter,);
    this.registerInclusionResolver('estado', this.estado.inclusionResolver);
  }
}
