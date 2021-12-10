import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Fecha} from './fecha.model';
import {Documento} from './documento.model';
import {Estado} from './estado.model';
import {Persona} from './persona.model';
import {Inmueble} from './inmueble.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  comentarios?: string;

  @hasMany(() => Fecha, {keyTo: 'id_solicitud'})
  fechas: Fecha[];

  @hasMany(() => Documento, {keyTo: 'id_solicitud'})
  documentos: Documento[];

  @belongsTo(() => Estado, {name: 'estado'})
  id_estado: number;

  @belongsTo(() => Persona, {name: 'cliente'})
  id_cliente: string;

  @belongsTo(() => Inmueble, {name: 'predio'})
  id_inmueble: string;
  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
