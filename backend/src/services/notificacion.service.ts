import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Persona, Email, FormularioRegistro, Solicitud} from '../models';
import {PersonaRepository, EmailRepository, InmuebleRepository, TipoInmuebleRepository, TipoOfertaRepository, EstadoRepository, FechaRepository} from '../repositories';
const fetch = require("cross-fetch");

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @repository(EmailRepository)
    public emailRepository: EmailRepository,
    @repository(InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,
    @repository(TipoInmuebleRepository)
    public tipoInmuebleRepository: TipoInmuebleRepository,
    @repository(TipoOfertaRepository)
    public tipoOfertaRepository: TipoOfertaRepository,
    @repository(EstadoRepository)
    public estadoRepository: EstadoRepository,
    @repository(FechaRepository)
    public fechasRepository: FechaRepository,
        
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
    let url = `${Llaves.urlVerificarEmail}${token}`;
    console.log(url);
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

    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });

    return url;
  }


  NotificarCredencialesAsesor(formulario: FormularioRegistro, clave: string) {
    let destino = formulario.email;
    let asunto = 'Credenciales de Asesor';
    let contenido = `
    <!DOCTYPE html>
    <html>
    <head>
    <!-- Último minificado bootstrap css -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- jQuery libraria incluida -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
    <!-- Último minificado bootstrap js -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
    .btn-success{margin: 10px;}
    </style>
    </head>
    <body>
    
    <div class="container">
    <h1>Credenciales de Asesor</h1>
      <p>Hola ${formulario.nombres} ${formulario.apellidos}! ¿Cómo te encuentras el día de hoy?<br><br>
        Queremos que seas parte de nuestro equipo como un <strong>Asesor</strong>.<br><br>
        Tus credenciales de acceso a "Hogar Colombia" son:<br>
        <div class="container">
          <strong>Usuario:</strong> ${formulario.email}<br>
          <strong>Contraseña:</strong> ${clave}<br>
      </div>
        <br>Por favor déjanos saber si aceptas:<br>
      </p>
    
    
    <!-- Button modal -->
    <button class="btn btn-success btn-lg" data-toggle="modal" data-target="#modalForm">
        Decide aquí
    </button>
    
    </div>

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

    return fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });
  }

  async NotificarSolicitudEnviada(solicitud: Solicitud) {
    let inmueble = await this.inmuebleRepository.findOne({where: {id: solicitud.id_inmueble}});
    let tipoI = await this.tipoInmuebleRepository.findOne({where: {id: inmueble?.id_tipoIn}});
    let tipoO = await this.tipoOfertaRepository.findOne({where: {id: inmueble?.id_tipoOf}});
    let estado = await this.estadoRepository.findOne({where: {id: solicitud.id_estado}});
    let fechas = await this.fechasRepository.find({where: {id_solicitud: solicitud.id}});
    let cliente = await this.personaRepository.findOne({where: {id: solicitud.id_cliente}});
    let clienteEmail = await this.emailRepository.findOne({where: {id: cliente?.id_email}});
    let asesor = await this.personaRepository.findOne({where: {id: inmueble?.id_asesor}});
    let destino = (await this.emailRepository.findOne({where: {id: asesor?.id_email}}))?.email;
    let asunto = 'Notificación de una nueva solicitud enviada';
    let contenido = `
    <html>
      <head></head>
      <body>
        <p>Hola ${asesor?.nombres} ${asesor?.apellidos}!<br><br>
          Queremos informarte que ha sido enviada una nueva solicitud para el inmueble a tu cargo.<br><br>
          <strong>Datos de la solicitud:</strong><br>
          Tipo de Oferta: ${tipoO?.nombre.trim().replace(/^\w/, (c) => c.toUpperCase())}<br>
          Fecha de la solicitud: ${fechas[0].fecha} ${fechas.length > 1 ? "- " + fechas[1].fecha : ""}<br>
          Estado de la solicitud: ${estado?.nombre}<br><br>

          <strong>Datos del cliente:</strong><br>
          Documento de identidad: ${cliente?.id}<br>
          Nombre completo: ${cliente?.nombres} ${cliente?.apellidos}<br>
          Celualr: ${cliente?.celular}<br>
          Email: ${clienteEmail?.email}<br><br>

          <strong>Datos del inmueble:</strong><br>
          Código: ${inmueble?.codigo}<br>
          Dirección: ${inmueble?.direccion}<br>
          Tipo de inmueble: ${tipoI?.nombre.trim().replace(/^\w/, (c) => c.toUpperCase())}<br>
          Fotografía: <br>
          <a href=${inmueble?.fotografia}><img src=${inmueble?.fotografia} alt="apa-001" border="0"></a><br><br>
          <br><br>
          <br>
        </p>
      </body>
    </html>
    `
    //Fecha de la solicitud: ${solicitud.fechas[0]} ${solicitud.fechas.length > 1 ? "- " + solicitud.fechas[1].fecha : ""}<br>
    //Imagen inmueble 1 grande:
    //<a href="https://ibb.co/ByCCsfw"><img src="https://i.ibb.co/QPKKmJX/apa-001.webp" alt="apa-001" border="0"></a>
    //Imagen inmueble 2 grande:
    //<a href="https://ibb.co/6ZpqfX1"><img src="https://i.ibb.co/ZJwbk2Y/apa-002.jpg" alt="apa-002" border="0"></a>

    return fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
      .then((data: any) => {
        console.log(data);
      });

  }

}
