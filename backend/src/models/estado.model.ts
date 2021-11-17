import {Entity, model, property, hasOne} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Solicitud} from './solicitud.model';

@model()
export class Estado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @hasOne(() => Inmueble, {keyTo: 'id_estado'})
  inmueble: Inmueble;

  @hasOne(() => Solicitud, {keyTo: 'id_estado'})
  solicitud: Solicitud;

  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
