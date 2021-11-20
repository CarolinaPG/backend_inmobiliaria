import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona, Email} from '../models';
import {PersonaRepository, EmailRepository} from '../repositories';
const fetch = require("cross-fetch");

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(EmailRepository)
    public emailRepository: EmailRepository
  ) {}

  /*
   * Add service methods here
   */
  NotificarRegistroPlataforma(persona: Persona, clave: string) {
    let destino = persona.id_email;
    let asunto = 'Registro en la Plataforma';
    let contenido = `Hola ${persona.nombres} ${persona.apellidos}. \nSu nombre de usuario es: ${persona.id_email}
    Su contraseña es ${clave}\n\nAdios!`;
    //<a href="url/confirmacion?token">aquí</a> para activar tu cuenta
  
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
  }

  NotificarRecuperacionClave(persona: Persona, clave: string) {
    let destino = persona.id_email;
    let asunto = 'Recuperación de Clave';
    let contenido = `Hola ${persona.nombres} ${persona.apellidos}. 
    
    Su nombre de usuario es: ${persona.id_email}
    Su nueva contraseña es: ${clave}
    
    Adios!`;
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
  }


}
