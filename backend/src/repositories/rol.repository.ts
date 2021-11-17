import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Rol, RolRelations, Operacion, RolOp} from '../models';
import {RolOpRepository} from './rol-op.repository';
import {OperacionRepository} from './operacion.repository';

export class RolRepository extends DefaultCrudRepository<
  Rol,
  typeof Rol.prototype.id,
  RolRelations
> {

  public readonly operaciones: HasManyThroughRepositoryFactory<Operacion, typeof Operacion.prototype.id,
          RolOp,
          typeof Rol.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolOpRepository') protected rolOpRepositoryGetter: Getter<RolOpRepository>, @repository.getter('OperacionRepository') protected operacionRepositoryGetter: Getter<OperacionRepository>,
  ) {
    super(Rol, dataSource);
    this.operaciones = this.createHasManyThroughRepositoryFactoryFor('operaciones', operacionRepositoryGetter, rolOpRepositoryGetter,);
    this.registerInclusionResolver('operaciones', this.operaciones.inclusionResolver);
  }
}
