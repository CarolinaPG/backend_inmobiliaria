import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Operacion, OperacionRelations} from '../models';

export class OperacionRepository extends DefaultCrudRepository<
  Operacion,
  typeof Operacion.prototype.id,
  OperacionRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Operacion, dataSource);
  }
}
