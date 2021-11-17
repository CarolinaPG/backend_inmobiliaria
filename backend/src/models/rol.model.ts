import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Operacion} from './operacion.model';
import {RolOperacion} from './rol-operacion.model';
import {Persona} from './persona.model';

@model()
export class Rol extends Entity {
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
  nombre: string;

  @hasMany(() => Operacion, {through: {model: () => RolOperacion, keyFrom: 'id_rol', keyTo: 'id_operacion'}})
  operaciones: Operacion[];

  @hasOne(() => Persona, {keyTo: 'id_rol'})
  persona: Persona;

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
