import {Entity, model, ObjectType, property, belongsTo} from '@loopback/repository';
import { isSchemaObject } from 'openapi3-ts';
import { Departamento } from './departamento.model';

@model()
export class Ciudad extends Entity {
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

  @belongsTo(() => Departamento, {name: 'depa'})
  id_depa: number;

  constructor(data?: Partial<Ciudad>) {
    super(data);
  }
}

export interface CiudadRelations {
  // describe navigational properties here
}

export type CiudadWithRelations = Ciudad & CiudadRelations;
