import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Modulo, ModuloRelations} from '../models';

export class ModuloRepository extends DefaultCrudRepository<
  Modulo,
  typeof Modulo.prototype.id,
  ModuloRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Modulo, dataSource);
  }
}
