import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Ciudad, CiudadRelations, Departamento} from '../models';
import {DepartamentoRepository} from './departamento.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.id,
  CiudadRelations
> {

  public readonly depa: BelongsToAccessor<Departamento, typeof Ciudad.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>,
  ) {
    super(Ciudad, dataSource);
    this.depa = this.createBelongsToAccessorFor('depa', departamentoRepositoryGetter,);
    this.registerInclusionResolver('depa', this.depa.inclusionResolver);
  }
}
