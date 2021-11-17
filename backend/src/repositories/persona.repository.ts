import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Persona, PersonaRelations, Inmueble, Solicitud, Rol, Email} from '../models';
import {SolicitudRepository} from './solicitud.repository';
import {InmuebleRepository} from './inmueble.repository';
import {RolRepository} from './rol.repository';
import {EmailRepository} from './email.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly inmuebles: HasManyThroughRepositoryFactory<Inmueble, typeof Inmueble.prototype.id,
          Solicitud,
          typeof Persona.prototype.id
        >;

  public readonly rolPersona: BelongsToAccessor<Rol, typeof Persona.prototype.id>;

  public readonly emailPersona: BelongsToAccessor<Email, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>, @repository.getter('RolRepository') protected rolRepositoryGetter: Getter<RolRepository>, @repository.getter('EmailRepository') protected emailRepositoryGetter: Getter<EmailRepository>,
  ) {
    super(Persona, dataSource);
    this.emailPersona = this.createBelongsToAccessorFor('emailPersona', emailRepositoryGetter,);
    this.registerInclusionResolver('emailPersona', this.emailPersona.inclusionResolver);
    this.rolPersona = this.createBelongsToAccessorFor('rolPersona', rolRepositoryGetter,);
    this.registerInclusionResolver('rolPersona', this.rolPersona.inclusionResolver);
    this.inmuebles = this.createHasManyThroughRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter, solicitudRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
  }
}
