import {Entity, model, property} from '@loopback/repository';

@model()
export class RolOp extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
  })
  id_rol?: number;

  @property({
    type: 'number',
  })
  id_operacion?: number;

  constructor(data?: Partial<RolOp>) {
    super(data);
  }
}

export interface RolOpRelations {
  // describe navigational properties here
}

export type RolOpWithRelations = RolOp & RolOpRelations;
