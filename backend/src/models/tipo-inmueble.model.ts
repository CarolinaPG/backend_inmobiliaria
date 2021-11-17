import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoInmueble extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
  })
  nombre?: string;


  constructor(data?: Partial<TipoInmueble>) {
    super(data);
  }
}

export interface TipoInmuebleRelations {
  // describe navigational properties here
}

export type TipoInmuebleWithRelations = TipoInmueble & TipoInmuebleRelations;
