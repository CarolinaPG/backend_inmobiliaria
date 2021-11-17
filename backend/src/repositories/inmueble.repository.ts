import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, Estado, Persona, Ciudad, TipoInmueble, TipoOferta, Rol} from '../models';
import {EstadoRepository} from './estado.repository';
import {PersonaRepository} from './persona.repository';
import {CiudadRepository} from './ciudad.repository';
import {TipoInmuebleRepository} from './tipo-inmueble.repository';
import {TipoOfertaRepository} from './tipo-oferta.repository';
import {RolRepository} from './rol.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly estInmueble: BelongsToAccessor<Estado, typeof Inmueble.prototype.id>;

  public readonly asesor: BelongsToAccessor<Persona, typeof Inmueble.prototype.id>;

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Inmueble.prototype.id>;

  public readonly tInmueble: BelongsToAccessor<TipoInmueble, typeof Inmueble.prototype.id>;

  public readonly tOferta: BelongsToAccessor<TipoOferta, typeof Inmueble.prototype.id>;

  public readonly rolPersona: BelongsToAccessor<Rol, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('TipoInmuebleRepository') protected tipoInmuebleRepositoryGetter: Getter<TipoInmuebleRepository>, @repository.getter('TipoOfertaRepository') protected tipoOfertaRepositoryGetter: Getter<TipoOfertaRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Inmueble, dataSource);
    this.rolPersona = this.createBelongsToAccessorFor('rolPersona', rolRepositoryGetter,);
    this.registerInclusionResolver('rolPersona', this.rolPersona.inclusionResolver);
    this.tOferta = this.createBelongsToAccessorFor('tOferta', tipoOfertaRepositoryGetter,);
    this.registerInclusionResolver('tOferta', this.tOferta.inclusionResolver);
    this.tInmueble = this.createBelongsToAccessorFor('tInmueble', tipoInmuebleRepositoryGetter,);
    this.registerInclusionResolver('tInmueble', this.tInmueble.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.asesor = this.createBelongsToAccessorFor('asesor', personaRepositoryGetter,);
    this.registerInclusionResolver('asesor', this.asesor.inclusionResolver);
    this.estInmueble = this.createBelongsToAccessorFor('estInmueble', estadoRepositoryGetter,);
    this.registerInclusionResolver('estInmueble', this.estInmueble.inclusionResolver);
  }
}
