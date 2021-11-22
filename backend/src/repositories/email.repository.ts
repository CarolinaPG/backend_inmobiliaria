import {inject} from '@loopback/core';
import {DefaultCrudRepository, } from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Email, EmailRelations, } from '../models';

export class EmailRepository extends DefaultCrudRepository<
  Email,
  typeof Email.prototype.id,
  EmailRelations
> {

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Email, dataSource);
  }
}
