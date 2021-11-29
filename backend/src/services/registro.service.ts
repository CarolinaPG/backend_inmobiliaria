import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { FormularioInmueble } from '../models';
import { FormularioRegistro } from '../models/formulario-registro.model';
import { CiudadRepository, EmailRepository, EstadoRepository, InmuebleRepository, PersonaRepository, TipoInmuebleRepository, TipoOfertaRepository } from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class RegistroService {
  constructor(
    @repository (PersonaRepository)
    public personaRepository: PersonaRepository,

    @repository (EmailRepository)
    public emailRepository: EmailRepository,

    @repository (InmuebleRepository)
    public inmuebleRepository: InmuebleRepository,

    @repository (CiudadRepository)
    public ciudadRepository: CiudadRepository,

    @repository (EstadoRepository)
    public estadoRepository: EstadoRepository,

    @repository (TipoInmuebleRepository)
    public tipoInmuebleRepository: TipoInmuebleRepository,

    @repository (TipoOfertaRepository)
    public tipoOfertaRepository: TipoOfertaRepository,

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

  async ValidarDatosInmueble(formulario: FormularioInmueble){
    if( !formulario.id_asesor || await this.ValidarPersona(formulario.id_asesor) == null ){
      //throw new HttpErrors[401]("El email es inválido.");
      console.log("Asesor problem")
      return false;
    } 
    if( !formulario.id_ciudad || await this.ValidarCiudad(formulario.id_ciudad) == null ){
      //throw new HttpErrors[401]("El email es inválido.");
      console.log("id_ciduad problem")
      return false;
    } 
    /**
    if( !formulario.id_estado || await this.ValidarEstado(formulario.id_estado) == null ){
      //throw new HttpErrors[401]("El email es inválido.");
      console.log("id_estado problem")
      return false;
    } 
    */
    if( !formulario.id_tipoIn || await this.ValidarTipoInmueble(formulario.id_tipoIn) == null ){
      //throw new HttpErrors[401]("El email es inválido.");
      console.log("id_tipoIn problem")
      return false;
    } 
    if( !formulario.id_tipoOf || await this.ValidarTipoOferta(formulario.id_tipoOf) == null ){
      //throw new HttpErrors[401]("El email es inválido.");
      console.log("id_tipoOf problem")
      return false;
    } 
    if( !formulario.codigo || await this.ValidarCodigo(formulario.codigo) != null ){
      //throw new HttpErrors[401]("El ID es inválido.")
      console.log("codigo problem")
      return false;
    }
    if( !formulario.direccion){
      //throw new HttpErrors[401]("El rol es inválido.")
      console.log("Dirección problem")
      return false;
    }
    if( !formulario.valor ) {// || formulario.nombres.length == 1 )
      //throw new HttpErrors[401]("Los nombres son requeridos.")    
      console.log("Valor problem")
      return false;
    }
    if( !formulario.fotografia ) {// || formulario.apellidos.length <= 2 )
      //throw new HttpErrors[401]("Los apellidos son requeridos.")    
      console.log("Fotografia problem")
      return false;
    }
    /**
    if( await this.ValidarInmueble(formulario) != null ){
      console.log("El inmueble ya existe");
      return false;
    }
    */
    return true;
  }

  async ValidarEmail(email: string){
    return await this.emailRepository.findOne({where: {email: email}});
  }

  async ValidarCiudad(id: number){
    return await this.ciudadRepository.findOne({where: {id: id}});
  }

  async ValidarEstado(id: number){
    return await this.estadoRepository.findOne({where: {id: id}});
  }
  
  async ValidarTipoInmueble(id: number){
    return await this.tipoInmuebleRepository.findOne({where: {id: id}});
  }
  
  async ValidarTipoOferta(id: number){
    return await this.tipoOfertaRepository.findOne({where: {id: id}});
  }
  
  async ValidarCodigo(id: string){
    return await this.inmuebleRepository.findOne({where: {codigo: id}});
  }

  /**
  async ValidarInmueble(formulario: FormularioInmueble ){
    return await this.inmuebleRepository.findOne({where: {id: id}});
  }
  */

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
      "tipoId": formulario.tipoId,
      "nombres": formulario.nombres,
      "apellidos": formulario.apellidos,
      "celular": formulario.celular
    });
    return p;
  }

  async RegistrarInmueble(formulario: FormularioInmueble){
    let i = await this.inmuebleRepository.create({
      "codigo": formulario.codigo,
      "direccion": formulario.direccion,
      "valor": formulario.valor,
      "fotografia": formulario.fotografia,
      "id_estado": 6,
      "id_tipoIn": formulario.id_tipoIn,
      "id_tipoOf": formulario.id_tipoOf,
      "id_ciudad": formulario.id_ciudad,
      "id_asesor": formulario.id_asesor,
      "videoYoutube": formulario.videoYoutube
    });
    return i;
  }

}
