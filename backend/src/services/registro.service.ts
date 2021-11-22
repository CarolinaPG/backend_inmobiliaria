import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { FormularioRegistro } from '../models/formulario-registro.model';
import { EmailRepository, PersonaRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class RegistroService {
  constructor(
    @repository (PersonaRepository)
    public personaRepository: PersonaRepository,

    @repository (EmailRepository)
    public emailRepository: EmailRepository
  ) {}

  /*
   * Add service methods here
   */
  ValidarDatos(formulario: FormularioRegistro, rol: number){
    if(!formulario.email || !this.ValidarEmail(formulario.email))
      throw new HttpErrors[401]("El email es inválido.");
    if(!formulario.id || !this.ValidarPersona(formulario.id))
      throw new HttpErrors[401]("El ID es inválido.")    
    if(!formulario.rol || formulario.rol != rol)
    throw new HttpErrors[401]("El rol es inválido.")
    if(!formulario.nombres)
      throw new HttpErrors[401]("Los nombres son requeridos.")    
    if(!formulario.apellidos)
      throw new HttpErrors[401]("Los apellidos son requeridos.")    
    if(!formulario.celular)
      throw new HttpErrors[401]("El celular es requerido.")    
    return true;
  }

  async ValidarEmail(email: string){
    return await this.emailRepository.findOne({where: {email: email}});
  }

  async ValidarPersona(id: string){
    return await this.personaRepository.findOne({where: {id: id}});
  }

  async RegistrarCorreo(email: string){
    return await this.emailRepository.create({
      "email": email,
    });
  }

  async RegistrarPersona(formulario: FormularioRegistro){
    let p = await this.personaRepository.create({
      "id": formulario.id,
      "nombres": formulario.nombres,
      "apellidos": formulario.apellidos,
      "celular": formulario.celular
    });
    return p;
  }

}
