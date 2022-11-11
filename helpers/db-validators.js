import { Role } from "../models/role.js";
import { Usuario } from "../models/usuario.js";

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
}

const emailExiste = async(email) => {
    console.log(email);
    const emailExiste = await Usuario.findOne( { email } );
    console.log(emailExiste);
    if( emailExiste ){
        throw new Error(`El email ya ha sido registrado`);
    }
}

const idExiste = async( id ) => {
    const idExiste = await Usuario.findById( id );
    if( !idExiste ){
        throw new Error(`El usuario no se ha encontrado`);
    }
}

export { esRolValido, emailExiste, idExiste };