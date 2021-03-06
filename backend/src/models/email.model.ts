import {Entity, model, property} from '@loopback/repository';

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
  })
  hash?: string;

  @property({
    type: 'string',
    default: "UNVERIFIED",
  })
  estado?: string;


  constructor(data?: Partial<Email>) {
    super(data);
  }
}

export interface EmailRelations {
  // describe navigational properties here
}

export type EmailWithRelations = Email & EmailRelations;
