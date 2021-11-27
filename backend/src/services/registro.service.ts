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
  async ValidarDatos(formulario: FormularioRegistro, rol: number){
    if( !formulario.email || await this.ValidarEmail(formulario.email) != null ){
      //throw new HttpErrors[401]("El email es inválido.");
      console.log("Email problem")
      return false;
    } 
    if( !formulario.id || await this.ValidarPersona(formulario.id) != null ){
      //throw new HttpErrors[401]("El ID es inválido.")
      console.log("ID problem")
      return false;
    }
    if( !formulario.rol || formulario.rol != rol ){
      //throw new HttpErrors[401]("El rol es inválido.")
      console.log("Rol problem")
      return false;
    }
    if( !formulario.nombres ) {// || formulario.nombres.length == 1 )
      //throw new HttpErrors[401]("Los nombres son requeridos.")    
      console.log("Nombres problem")
      return false;
    }
    if( !formulario.apellidos ) {// || formulario.apellidos.length <= 2 )
      //throw new HttpErrors[401]("Los apellidos son requeridos.")    
      console.log("Apellidos problem")
      return false;
    }
    if( !formulario.celular ){
      //throw new HttpErrors[401]("El celular es requerido.")    
      console.log("Celular problem")
      return false;
    }
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
