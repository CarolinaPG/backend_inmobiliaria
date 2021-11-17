import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RolOperacion, RolOperacionRelations} from '../models';

export class RolOperacionRepository extends DefaultCrudRepository<
  RolOperacion,
  typeof RolOperacion.prototype.id,
  RolOperacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(RolOperacion, dataSource);
  }
}
