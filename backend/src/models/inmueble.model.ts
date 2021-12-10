import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estado} from './estado.model';
import {TipoInmueble} from './tipo-inmueble.model';
import {TipoOferta} from './tipo-oferta.model';
import {Ciudad} from './ciudad.model';
import {Persona} from './persona.model';

@model()
export class Inmueble extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  codigo: string;

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
    default: "",
  })
  videoYoutube?: string;

  @property({
    type: 'string',
    default: "",
  })
  departamento: string;

  @belongsTo(() => Estado, {name: 'estado'})
  id_estado: number;

  @belongsTo(() => TipoInmueble, {name: 'tipoIn'})
  id_tipoIn: number;

  @belongsTo(() => TipoOferta, {name: 'tipoO'})
  id_tipoOf: number;

  @belongsTo(() => Persona, {name: 'asesor'})
  id_asesor: string;

  @belongsTo(() => Ciudad, {name: 'ciudad'})
  id_ciudad: number;

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
