import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Estado, EstadoRelations, Email} from '../models';
import {EmailRepository} from './email.repository';

export class EstadoRepository extends DefaultCrudRepository<
  Estado,
  typeof Estado.prototype.id,
  EstadoRelations
> {

  public readonly email: HasOneRepositoryFactory<Email, typeof Estado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmailRepository') protected emailRepositoryGetter: Getter<EmailRepository>,
  ) {
    super(Estado, dataSource);
    this.email = this.createHasOneRepositoryFactoryFor('email', emailRepositoryGetter);
    this.registerInclusionResolver('email', this.email.inclusionResolver);
  }
}
