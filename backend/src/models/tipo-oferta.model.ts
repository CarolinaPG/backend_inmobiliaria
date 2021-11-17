import {Entity, model, property, hasOne} from '@loopback/repository';
import {Inmueble} from './inmueble.model';

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

  @hasOne(() => Inmueble, {keyTo: 'id_tipoOferta'})
  inmueble: Inmueble;

  constructor(data?: Partial<TipoOferta>) {
    super(data);
  }
}

export interface TipoOfertaRelations {
  // describe navigational properties here
}

export type TipoOfertaWithRelations = TipoOferta & TipoOfertaRelations;
