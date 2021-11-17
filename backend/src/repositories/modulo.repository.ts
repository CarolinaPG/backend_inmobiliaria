import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Modulo, ModuloRelations, Operacion} from '../models';
import {OperacionRepository} from './operacion.repository';

export class ModuloRepository extends DefaultCrudRepository<
  Modulo,
  typeof Modulo.prototype.id,
  ModuloRelations
> {

  public readonly moduloOperaciones: HasManyRepositoryFactory<Operacion, typeof Modulo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OperacionRepository') protected operacionRepositoryGetter: Getter<OperacionRepository>,
  ) {
    super(Modulo, dataSource);
    this.moduloOperaciones = this.createHasManyRepositoryFactoryFor('moduloOperaciones', operacionRepositoryGetter,);
    this.registerInclusionResolver('moduloOperaciones', this.moduloOperaciones.inclusionResolver);
  }
}
