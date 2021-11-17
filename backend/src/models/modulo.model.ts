import {Entity, model, property} from '@loopback/repository';

@model()
export class Modulo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;


  constructor(data?: Partial<Modulo>) {
    super(data);
  }
}

export interface ModuloRelations {
  // describe navigational properties here
}

export type ModuloWithRelations = Modulo & ModuloRelations;
