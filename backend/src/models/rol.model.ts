import {Entity, model, property, hasMany} from '@loopback/repository';
import {Operacion} from './operacion.model';
import {RolOp} from './rol-op.model';

@model()
export class Rol extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Operacion, {through: {model: () => RolOp, keyFrom: 'id_rol', keyTo: 'id_operacion'}})
  operaciones: Operacion[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
