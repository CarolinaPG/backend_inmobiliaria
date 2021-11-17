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

  public readonly modOperaciones: HasManyRepositoryFactory<Operacion, typeof Modulo.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OperacionRepository') protected operacionRepositoryGetter: Getter<OperacionRepository>,
  ) {
    super(Modulo, dataSource);
    this.modOperaciones = this.createHasManyRepositoryFactoryFor('modOperaciones', operacionRepositoryGetter,);
    this.registerInclusionResolver('modOperaciones', this.modOperaciones.inclusionResolver);
  }
}
