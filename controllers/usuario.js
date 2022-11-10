import { response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario.js';

const usuarioGet = ( req, res = response ) => {

    const {nombre = "Sin nombre", apellido = "Sin apellido"} = req.query;

    res.json({
        "msg": "Get API - Desde el controlador",
        nombre,
        apellido
    });
}

const usuarioPut = async( req, res = response ) => {

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    // * TODO para validar contra base de datos
    if( password ){
        // * Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json({
        "msg": "Put API - Desde el controlador",
        usuario
    });
}

const usuarioPost = async( req, res = response ) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    // * Verificar si el correo existe

    // * Hashear la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // * Guardar en base de datos
    await usuario.save();

    res.json({
        "msg": "Post API - Desde el controlador",
        usuario
    });
}

const usuarioDelete = ( req, res = response ) => {
    res.json({
        "msg": "Delete API - Desde el controlador"
    });
}

const usuarioPatch = ( req, res = response ) => {
    res.json({
        "msg": "Patch API - Desde el controlador"
    });
}

export {
    usuarioGet,
    usuarioPut,
    usuarioDelete,
    usuarioPatch,
    usuarioPost
}