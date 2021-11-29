import {Model, model, property} from '@loopback/repository';

@model()
export class FormularioInmueble extends Model {
  @property({
    type: 'string',
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
    type: 'number',
    require: true,
  })
  id_estado: number;

  @property({
    type: 'number',
    required: true,
  })
  id_tipoIn: number;

  @property({
    type: 'number',
    required: true,
  })
  id_tipoOf: number;

  @property({
    type: 'number',
    required: true,
  })
  id_ciudad: number;

  @property({
    type: 'string',
    required: true,
  })
  id_asesor: string;


  constructor(data?: Partial<FormularioInmueble>) {
    super(data);
  }
}

export interface FormularioInmuebleRelations {
  // describe navigational properties here
}

export type FormularioInmuebleWithRelations = FormularioInmueble & FormularioInmuebleRelations;
