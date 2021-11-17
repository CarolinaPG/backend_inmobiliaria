import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Operacion, RolOperacion, Persona} from '../models';
import {RolOperacionRepository} from './rol-operacion.repository';
import {OperacionRepository} from './operacion.repository';
import {PersonaRepository} from './persona.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly operaciones: HasManyThroughRepositoryFactory<Operacion, typeof Operacion.prototype.id,
          RolOperacion,
          typeof Rol.prototype.id
        >;

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Rol.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolOperacionRepository') protected rolOperacionRepositoryGetter: Getter<RolOperacionRepository>, @repository.getter('OperacionRepository') protected operacionRepositoryGetter: Getter<OperacionRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Rol, dataSource);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.operaciones = this.createHasManyThroughRepositoryFactoryFor('operaciones', operacionRepositoryGetter, rolOperacionRepositoryGetter,);
    this.registerInclusionResolver('operaciones', this.operaciones.inclusionResolver);
  }
}
