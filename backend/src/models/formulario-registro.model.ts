import {Model, model, property} from '@loopback/repository';

@model()
export class FormularioRegistro extends Model {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  rol: number;


  constructor(data?: Partial<FormularioRegistro>) {
    super(data);
  }
}

export interface FormularioRegistroRelations {
  // describe navigational properties here
}

export type FormularioRegistroWithRelations = FormularioRegistro & FormularioRegistroRelations;
