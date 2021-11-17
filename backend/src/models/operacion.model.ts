import {Entity, model, property} from '@loopback/repository';

@model()
export class Operacion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Operacion>) {
    super(data);
  }
}

export interface OperacionRelations {
  // describe navigational properties here
}

export type OperacionWithRelations = Operacion & OperacionRelations;
