import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Email, EmailRelations, Estado} from '../models';
import {EstadoRepository} from './estado.repository';

export class EmailRepository extends DefaultCrudRepository<
  Email,
  typeof Email.prototype.id,
  EmailRelations
> {

  public readonly estEmail: BelongsToAccessor<Estado, typeof Email.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstadoRepository') protected estadoRepositoryGetter: Getter<EstadoRepository>,
  ) {
    super(Email, dataSource);
    this.estEmail = this.createBelongsToAccessorFor('estEmail', estadoRepositoryGetter,);
    this.registerInclusionResolver('estEmail', this.estEmail.inclusionResolver);
  }
}
