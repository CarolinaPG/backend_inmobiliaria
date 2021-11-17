import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {RolOp, RolOpRelations} from '../models';

export class RolOpRepository extends DefaultCrudRepository<
  RolOp,
  typeof RolOp.prototype.id,
  RolOpRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(RolOp, dataSource);
  }
}
