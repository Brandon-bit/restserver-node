import { response } from 'express';

const usuarioGet = ( req, res = response ) => {

    const {nombre = "Sin nombre", apellido = "Sin apellido"} = req.query;

    res.json({
        "msg": "Get API - Desde el controlador",
        nombre,
        apellido
    });
}

const usuarioPut = ( req, res = response ) => {

    const id = req.params.id;

    res.json({
        "msg": "Put API - Desde el controlador",
        id
    });
}

const usuarioPost = ( req, res = response ) => {

    const { nombre, edad } = req.body;

    res.json({
        "msg": "Post API - Desde el controlador",
        edad,
        nombre
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