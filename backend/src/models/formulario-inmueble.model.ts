import {Model, model, property} from '@loopback/repository';

@model()
export class FormularioInmueble extends Model {
  @property({
    type: 'string',
    //required: true,
  })
  id?: string;

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
  estado: number;

  @property({
    type: 'number',
    required: true,
  })
  tipoIn: number;

  @property({
    type: 'number',
    required: true,
  })
  tipoOf: number;

  @property({
    type: 'number',
    required: true,
  })
  ciudad: number;

  @property({
    type: 'number',
    required: true,
  })
  departamento?: number;

  @property({
    type: 'string',
    required: true,
  })
  asesor: string;


  constructor(data?: Partial<FormularioInmueble>) {
    super(data);
  }
}

export interface FormularioInmuebleRelations {
  // describe navigational properties here
}

export type FormularioInmuebleWithRelations = FormularioInmueble & FormularioInmuebleRelations;
