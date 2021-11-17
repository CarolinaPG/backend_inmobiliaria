import {Entity, model, property} from '@loopback/repository';

@model()
export class Estado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;


  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
