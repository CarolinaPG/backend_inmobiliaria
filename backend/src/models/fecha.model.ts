import {Entity, model, property} from '@loopback/repository';

@model()
export class Fecha extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
  })
  id_solicitud?: string;

  constructor(data?: Partial<Fecha>) {
    super(data);
  }
}

export interface FechaRelations {
  // describe navigational properties here
}

export type FechaWithRelations = Fecha & FechaRelations;
