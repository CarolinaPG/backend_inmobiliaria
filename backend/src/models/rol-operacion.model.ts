import {Entity, model, property} from '@loopback/repository';

@model()
export class RolOperacion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<RolOperacion>) {
    super(data);
  }
}

export interface RolOperacionRelations {
  // describe navigational properties here
}

export type RolOperacionWithRelations = RolOperacion & RolOperacionRelations;
