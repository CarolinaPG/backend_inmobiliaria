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
    let contenido = `
    <html>
      <head></head>
      <body>
        <p>Hola ${persona.nombres} ${persona.apellidos}!<br><br>
           ¿Cómo te encuentras el día de hoy?<br><br>
           Bienvenido a "Hogar Colombia"<br>
           Es un placer para nosotros poder apoyarte para encontrar lo que buscas.<br>
           Su nombre de usuario es: ${persona.id_email}<br>
           Su contraseña es: ${clave}<br><br>
           
           Haga click <a href="http://www.python.org">aquí</a> para confirmar su email.
        </p>
        
        <p> 
            <a href="https://ibb.co/8rgfjD1"><img src="https://i.ibb.co/ZBzFh6q/Estructura-General-drawio.png" alt="Estructura-General-drawio" border="0"></a>
        </p>
      </body>
    </html>
    `

    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
  }

  NotificarRecuperacionClave(persona: Persona, clave: string) {
    let destino = persona.id_email;
    let asunto = 'Recuperación de Contraseña';
    let contenido = `
    <html>
      <head></head>
      <body>
        <p>Hola ${persona.nombres} ${persona.apellidos}!<br><br>
           ¿Cómo te encuentras el día de hoy?<br><br>
           Queremos que recuperes tu acceso a "Hogar Colombia"<br>
           Su nombre de usuario es: ${persona.id_email}<br>
           Su nueva contraseña es: ${clave}<br><br>
        </p>
        
        <p> 
            <a href="https://ibb.co/8rgfjD1"><img src="https://i.ibb.co/ZBzFh6q/Estructura-General-drawio.png" alt="Estructura-General-drawio" border="0"></a>
        </p>
      </body>
    </html>
    `

    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });

  }
}
