import {Model, model, property} from '@loopback/repository';
import {Documento, Estado, Inmueble, Persona} from '.';

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
  id_cliente: string;

  @property({
    type: 'object',
    //default: 1,
  })
  cliente?: Persona;

  @property({
    type: 'string',
    required: true,
  })
  id_inmueble: string;

  @property({
    type: 'object',
    //required: true,
  })
  inmueble: Inmueble;

  @property({
    type: 'number',
    default: 1,
  })
  id_estado?: number;

  @property({
    type: 'object',
    //default: 1,
  })
  estado?: Estado;

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
