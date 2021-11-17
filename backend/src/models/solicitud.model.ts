import {Entity, model, property, hasMany} from '@loopback/repository';
import {Documento} from './documento.model';
import {Fecha} from './fecha.model';

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
    required: true,
  })
  comentarios: string;

  @hasMany(() => Documento, {keyTo: 'id_solicitud'})
  documentos: Documento[];

  @property({
    type: 'number',
  })
  id_estado?: number;

  @hasMany(() => Fecha, {keyTo: 'id_solicitud'})
  fechas: Fecha[];

  @property({
    type: 'string',
  })

  @property({
    type: 'string',
  })
  id_cliente?: string;

  @property({
    type: 'string',
  })
  id_inmueble?: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
