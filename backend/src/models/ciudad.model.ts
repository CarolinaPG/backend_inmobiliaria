import {Entity, model, property, hasOne} from '@loopback/repository';
import {Inmueble} from './inmueble.model';

@model()
export class Ciudad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'number',
  })
  id_depa?: number;

  @hasOne(() => Inmueble, {keyTo: 'id_ciudad'})
  inmueble: Inmueble;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
