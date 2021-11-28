import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Persona } from '../models';
import { PersonaRepository, EmailRepository, RolRepository } from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,

    @repository(EmailRepository)
    public emailRepository: EmailRepository,

    @repository(RolRepository)
    public rolRepository: RolRepository,
  ) {}

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

  GenerarTokenJWT(persona: Persona) {
    let token = jwt.sign({
      expiresIn: 60 * 30, // expires in 30 minutos = 60*30 = 1800 segundos      info: {
      info: {
        id: persona.id,
        nombre: persona.nombres + " " + persona.apellidos,
        celular: persona.celular,
        correo: persona.id_email,
        rol: persona.id_rol
      }
    }, Llaves.claveJWT);
    return token;
  }

  GenerarTokenJWTEmail(email: string) {
    let token = jwt.sign({
      expiresIn: 60 * 30, // expires in 30 minutos = 60*30 = 1800 segundos
      email: email
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

  async IdentificarPersona(usuario: string, clave: string) {
    try {
      let em = await this.emailRepository.findOne({where: {email: usuario}});
      //let claveCifrada = this.CifrarClave(clave);
      let p = await this.personaRepository.findOne({where: {id_email: em?.getId() , clave: clave}});
      return p;
    } catch {
      return false;
    }
  }

}
