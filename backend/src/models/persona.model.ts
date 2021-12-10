import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Inmueble} from './inmueble.model';
import {Solicitud} from './solicitud.model';
import {Email} from './email.model';
import {Rol} from './rol.model';

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
  tipoId: string;

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
  })
  clave?: string;

  /**
  @hasMany(() => Inmueble, {through: {model: () => Solicitud, keyFrom: 'id_cliente', keyTo: 'id_inmueble'}})
  inmuebles: Inmueble[];
  */

  @belongsTo(() => Email, {name: 'email'})
  id_email: string;

  @belongsTo(() => Rol, {name: 'rol'})
  id_rol: number;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;
