import {Entity, model, property, hasMany} from '@loopback/repository';
import {Operacion} from './operacion.model';

@model()
export class Modulo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @hasMany(() => Operacion, {keyTo: 'id_modulo'})
  moduloOperaciones: Operacion[];

  constructor(data?: Partial<Modulo>) {
    super(data);
  }
}

export interface ModuloRelations {
  // describe navigational properties here
}

export type ModuloWithRelations = Modulo & ModuloRelations;
