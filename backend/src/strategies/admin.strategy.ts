import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request, } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import parseBearerToken from "parse-bearer-token";
import { AutenticacionService } from "../services";

export class EstrategiaAdminsitrador implements AuthenticationStrategy{
    name: string = 'admin';

    constructor(
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ){

    }


    async authenticate(request: Request): Promise<UserProfile | undefined>{
        let token = parseBearerToken(request);
        if(token){
            let datos = this.servicioAutenticacion.ValidarTokenJWT(token);
            if(datos.info){
                if(datos.info.rol == 1){
                    console.log(datos.info)
                    let perfil: UserProfile = Object.assign({
                        nombre: datos.info.nombre
                    })
                    return perfil;
                } else {
                    throw new HttpErrors[401]("El usuario no es administrador.");
                }
            } else {
                throw new HttpErrors[401]("El token incluído no es válido.");
            }
        } else {
            throw new HttpErrors[401]("No se ha incluído un token en la solicitud.")
        }
    }

}