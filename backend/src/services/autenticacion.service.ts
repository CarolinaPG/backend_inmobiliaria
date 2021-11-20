import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona} from '../models';
import {PersonaRepository, EmailRepository} from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(EmailRepository)
    public emailRepository: EmailRepository
  ) { }

  /*
   * Add service methods here
   */
  GenerarClave() {
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string) {
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

/**  VerificarEmailExiste(emailId: string){
    let em = this.emailRepository.findById(emailId);
    //let em = this.emailRepository.findOne({where: {email: usuario}});
    if(em != null){
      return true;
    } else {
      return false;
    }
  }
*/
  async IdentificarPersona(usuario: string, clave: string) {
    try {
      let em = await this.emailRepository.findOne({where: {email: usuario}});
      let claveCifrada = this.CifrarClave(clave);
      let p = await this.personaRepository.findOne({where: {id_email: em?.getId() , clave: claveCifrada}});
      if (p) {
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }

  async RecuperarClave(usuario: string) {
    try {
      let em = await this.emailRepository.findOne({where: {email: usuario}});
      let p = await this.personaRepository.findOne({where: {id_email: em?.getId()}});
      if (p) {
        let clave = this.GenerarClave();
        let claveCifrada = this.CifrarClave(clave);
        p.clave = claveCifrada;
        return p;
      }
      return false;
    } catch {
      return false;
    }
  }
  
  GenerarTokenJWT(persona: Persona) {
    let token = jwt.sign({
      //expiración fecha -> No se va a usar
      data: {
        id: persona.id,
        correo: persona.id_email,
        nombre: persona.nombres + " " + persona.apellidos
      }
    }, Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }
  }
}
