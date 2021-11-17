import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Documento, DocumentoRelations} from '../models';

export class DocumentoRepository extends DefaultCrudRepository<
  Documento,
  typeof Documento.prototype.id,
  DocumentoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Documento, dataSource);
  }
}
