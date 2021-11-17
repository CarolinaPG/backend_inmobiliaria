import {Entity, model, property, hasOne} from '@loopback/repository';
import {Email} from './email.model';

@model()
export class Estado extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @hasOne(() => Email, {keyTo: 'id_estado'})
  email: Email;

  constructor(data?: Partial<Estado>) {
    super(data);
  }
}

export interface EstadoRelations {
  // describe navigational properties here
}

export type EstadoWithRelations = Estado & EstadoRelations;
