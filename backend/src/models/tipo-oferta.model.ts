import {Entity, model, property} from '@loopback/repository';

@model()
export class TipoOferta extends Entity {
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


  constructor(data?: Partial<TipoOferta>) {
    super(data);
  }
}

export interface TipoOfertaRelations {
  // describe navigational properties here
}

export type TipoOfertaWithRelations = TipoOferta & TipoOfertaRelations;
