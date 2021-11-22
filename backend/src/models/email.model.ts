import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estado} from './estado.model';

@model()
export class Email extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: false,
  })
  hash: string;

  @property({
    type: 'string',
    required: false,
    default: "UNVERIFIED",
  })
  estado: string;

  constructor(data?: Partial<Email>) {
    super(data);
  }
}

export interface EmailRelations {
  // describe navigational properties here
}

export type EmailWithRelations = Email & EmailRelations;
