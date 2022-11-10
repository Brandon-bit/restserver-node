import { Role } from "../models/role.js";
import { Usuario } from "../models/usuario.js";

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const emailExiste = async(email = '') => {
    const emailExiste = await Usuario.findOne({ email });
    if( emailExiste ){
        throw new Error(`El email ya ha sido registrado`);
    }
}

export { esRolValido, emailExiste };