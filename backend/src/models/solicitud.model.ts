import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Fecha} from './fecha.model';
import {Documento} from './documento.model';
import {Estado} from './estado.model';

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

  @property({
    type: 'string',
  })
  id_cliente?: string;

  @property({
    type: 'string',
  })
  id_inmueble?: string;

  @hasMany(() => Fecha, {keyTo: 'id_solicitud'})
  fechas: Fecha[];

  @hasMany(() => Documento, {keyTo: 'id_solicitud'})
  documentos: Documento[];

  @belongsTo(() => Estado, {name: 'estSolicitud'})
  id_estado: number;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
