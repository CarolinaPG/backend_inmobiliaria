import {Model, model, property} from '@loopback/repository';
import { Documento, Fecha } from '.';

@model()
export class FormularioSolicitud extends Model {
  @property({
    type: 'string',
    default: "",
  })
  comentarios?: string;

  @property({
    type: 'string',
    required: true,
  })
  cliente: string;

  @property({
    type: 'string',
    required: true,
  })
  inmueble: string;

  @property({
    type: 'number',
    default: 1,
  })
  estado?: number;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  fechas: string[];


  @property({
    type: 'array',
    itemType: 'object',
    default: [],
  })
  documentos?: Documento[];


  constructor(data?: Partial<FormularioSolicitud>) {
    super(data);
  }
}

export interface FormularioSolicitudRelations {
  // describe navigational properties here
}

export type FormularioSolicitudWithRelations = FormularioSolicitud & FormularioSolicitudRelations;
