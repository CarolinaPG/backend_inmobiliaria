import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estado} from './estado.model';
import {Persona} from './persona.model';
import {Ciudad} from './ciudad.model';
import {TipoInmueble} from './tipo-inmueble.model';
import {TipoOferta} from './tipo-oferta.model';
import {Rol} from './rol.model';

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
  })
  videoYoutube?: string;

  @belongsTo(() => Estado, {name: 'estInmueble'})
  id_estado: number;

  @belongsTo(() => Persona, {name: 'asesor'})
  id_asesor: string;

  @belongsTo(() => Ciudad, {name: 'ciudad'})
  id_ciudad: number;

  @belongsTo(() => TipoInmueble, {name: 'tInmueble'})
  id_tipoInmueble: number;

  @belongsTo(() => TipoOferta, {name: 'tOferta'})
  id_tipoOferta: number;

  @belongsTo(() => Rol, {name: 'rolPersona'})
  id_rol: number;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
