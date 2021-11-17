import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Inmueble extends Entity {
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
  direccion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @property({
    type: 'string',
    required: true,
  })
  videoYoutube: string;

  @property({
    type: 'number',
  })
  id_tipoOferta?: number;

  @property({
    type: 'number',
  })
  id_tipoInmueble?: number;

  @property({
    type: 'string',
  })
  id_ciudad?: string;

  @property({
    type: 'number',
  })
  id_estado?: number;

  @hasMany(() => Solicitud, {keyTo: 'id_inmueble'})
  solicitudes: Solicitud[];

  @property({
    type: 'string',
  })
  id_asesor?: string;


  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
