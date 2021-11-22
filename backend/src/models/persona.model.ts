import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Solicitud} from './solicitud.model';
import {Rol} from './rol.model';
import {Email} from './email.model';

@model()
export class Persona extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
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
    required: false,
  })
  clave?: string;

  @property({
    type: 'string',
    required: false,
  })
  link: string;

  @hasMany(() => Inmueble, {through: {model: () => Solicitud, keyFrom: 'id_cliente', keyTo: 'id_inmueble'}})
  inmuebles: Inmueble[];

  @belongsTo(() => Rol, {name: 'rolPersona'})
  id_rol: number;

  @belongsTo(() => Email, {name: 'emailPersona'})
  id_email: string;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
