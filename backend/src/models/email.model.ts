import {Entity, model, property, hasOne} from '@loopback/repository';
import {Persona} from './persona.model';

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
    type: 'number',
  })
  id_estado?: number;

  @hasOne(() => Persona, {keyTo: 'id_email'})
  persona: Persona;

  constructor(data?: Partial<Email>) {
    super(data);
  }
}

export interface EmailRelations {
  // describe navigational properties here
}

export type EmailWithRelations = Email & EmailRelations;
