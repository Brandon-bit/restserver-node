import { response } from 'express';
import bcryptjs from 'bcryptjs';
import { Usuario } from '../models/usuario.js';

const usuarioGet = async( req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    // const query = { estado: true };

    const usuarios = await Usuario.find().skip( Number( desde ) ).limit( Number( limite ) );

    // const [ total, usuarios ] = await Promise.all([
    //     Usuario.count( query ),
    //     Usuario.find( query ).skip( Number( desde ) ).limit( Number( limite ) )
    // ]);

    
    res.json({
        usuarios
    });

}

const usuarioPut = async( req, res = response ) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

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

const usuarioDelete = async( req, res = response ) => {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );
    const usuarioAut = req.usuarioAut;

    res.json({
        "msg": "Delete API - Desde el controlador",
        usuario,
        usuarioAut
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