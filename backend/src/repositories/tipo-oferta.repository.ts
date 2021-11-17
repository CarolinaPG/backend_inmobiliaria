import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {TipoOferta, TipoOfertaRelations} from '../models';

export class TipoOfertaRepository extends DefaultCrudRepository<
  TipoOferta,
  typeof TipoOferta.prototype.id,
  TipoOfertaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(TipoOferta, dataSource);
  }
}
