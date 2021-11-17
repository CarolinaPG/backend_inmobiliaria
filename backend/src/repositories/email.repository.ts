import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Email, EmailRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class EmailRepository extends DefaultCrudRepository<
  Email,
  typeof Email.prototype.id,
  EmailRelations
> {

  public readonly persona: HasOneRepositoryFactory<Persona, typeof Email.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Email, dataSource);
    this.persona = this.createHasOneRepositoryFactoryFor('persona', personaRepositoryGetter);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
  }
}
