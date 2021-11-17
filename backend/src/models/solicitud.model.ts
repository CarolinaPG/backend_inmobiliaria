import {Entity, model, property, hasMany} from '@loopback/repository';
import {Documento} from './documento.model';

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
    type: 'string',
  })
  id_cliente?: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
