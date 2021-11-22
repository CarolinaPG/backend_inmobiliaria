import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Inmueble, Solicitud, Email, Rol} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {InmuebleRepository} from './inmueble.repository';
import {EmailRepository} from './email.repository';
import {RolRepository} from './rol.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly inmuebles: HasManyThroughRepositoryFactory<Inmueble, typeof Inmueble.prototype.id,
          Solicitud,
          typeof Persona.prototype.id
        >;

  public readonly email: BelongsToAccessor<Email, typeof Persona.prototype.id>;

  public readonly rol: BelongsToAccessor<Rol, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('EmailRepository') protected emailRepositoryGetter: Getter<EmailRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>,
  ) {
    super(Persona, dataSource);
    this.rol = this.createBelongsToAccessorFor('rol', rolRepositoryGetter,);
    this.registerInclusionResolver('rol', this.rol.inclusionResolver);
    this.email = this.createBelongsToAccessorFor('email', emailRepositoryGetter,);
    this.registerInclusionResolver('email', this.email.inclusionResolver);
    this.inmuebles = this.createHasManyThroughRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter, solicitudRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
