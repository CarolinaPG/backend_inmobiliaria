import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Fecha, FechaRelations} from '../models';

export class FechaRepository extends DefaultCrudRepository<
  Fecha,
  typeof Fecha.prototype.id,
  FechaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Fecha, dataSource);
  }
}
