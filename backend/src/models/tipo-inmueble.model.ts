import {Entity, model, property, hasOne} from '@loopback/repository';
import {Inmueble} from './inmueble.model';

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

  @hasOne(() => Inmueble, {keyTo: 'id_tipoInmueble'})
  inmueble: Inmueble;

  constructor(data?: Partial<TipoInmueble>) {
    super(data);
  }
}

export interface TipoInmuebleRelations {
  // describe navigational properties here
}

export type TipoInmuebleWithRelations = TipoInmueble & TipoInmuebleRelations;
