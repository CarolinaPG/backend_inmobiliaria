import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona, Email, FormularioRegistro} from '../models';
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
  NotificarRegistroAdmin(formulario: FormularioRegistro, clave: string) {
    let destino = formulario.email;
    let asunto = 'Bienvenido usuario Administrador';
    let contenido = `
    <html>
      <head></head>
      <body>
        <p>Hola ${formulario.nombres} ${formulario.apellidos}!<br><br>
           Bienvenido a "Hogar Colombia". Eres un usuario Administrador de la plataforma.<br>
           Nombre de usuario: ${destino}<br>
           Contraseña: ${clave}<br><br>
           
           <a href="https://ibb.co/8rgfjD1"><img src="https://i.ibb.co/ZBzFh6q/Estructura-General-drawio.png" alt="Estructura-General-drawio" border="0"></a>
           </p>
      </body>
    </html>
    `

    return fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
  }


  NotificarRegistroPlataforma(formulario: FormularioRegistro, clave: string, token: any) {
    let destino = formulario.email;
    let asunto = 'Registro en la Plataforma';
    let url = `${Llaves.urlVerificarEmail}/personas/${token}`;
    let contenido = `
    <html>
      <head></head>
      <body>
        <p>Hola ${formulario.nombres} ${formulario.apellidos}!<br><br>
           ¿Cómo te encuentras el día de hoy?<br><br>
           Bienvenido a "Hogar Colombia"<br>
           Es un placer para nosotros poder apoyarte para encontrar lo que buscas.<br>
           Su nombre de usuario es: ${destino}<br>
           Su contraseña es: ${clave}<br><br>
           
           <a href="${url}">Confirme su email aquí.</a>
        </p>
      </body>
    </html>
    `

    return fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
  }


  NotificarCredencialesAsesor(formulario: FormularioRegistro, clave: string) {
    let destino = formulario.email;
    let asunto = 'Credenciales de Asesor';
    let contenido = `
    <html>
      <head></head>
      <body>
        <p>Hola ${formulario.nombres} ${formulario.apellidos}!<br><br>
           ¿Cómo te encuentras el día de hoy?<br><br>
           Es un placer para nosotros tenerte como parte fundamental de nuestro equipo de trabajo como el mejor "Asesor".<br>
           Por ello te entregamos tus credenciales de acceso a "Hogar Colombia"<br>
           Nombre de usuario: ${formulario.email}<br>
           Contraseña: ${clave}<br><br>
        </p>
        
        <p> 
            Has click <a href="https://misiontic.ucaldas.edu.co">aquí</a> para confirmar tu decisión.
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
