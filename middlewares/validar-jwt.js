import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
import { Usuario } from '../models/usuario.js';
const env = dotenv.config().parsed;

const validarJWT = async( req, res, next ) => {
    const token = req.header('x-token');

    if( !token ){
        return res.status( 401 ).json({
            msg: 'No hay token en la peticion'
        });
    }

    try{
        const { uid } = jwt.verify( token, env.SECRETORPRIVATEKEY );

        //* Obtener el id del usuario autenticado
        req.uid = uid;

        //* Obtener el usuario completo
        req.usuarioAut = await Usuario.findById( uid );

        //* Revisar si el estado esta en tru
        if( !req.usuarioAut.estado ){
            return res.status( 401 ).json({
                msg: 'El usuario tiene un estado false'
            })
        }

        next();
    } catch( error ){
        console.log( error );
        res.status( 401 ).json({
            msg: 'Token no valido'
        });
    }

}

export { validarJWT }