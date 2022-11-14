import {Usuario} from '../models/usuario.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generarJWT.js';

const login = async( req, res ) => {

    const { correo, password } = req.body;

    try{
        //* Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if( !usuario ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }

        //* Si el usuario esta activo
        if( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }

        //* Verificar contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //* Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch( error ){

        console.log( error );

        res.status(500).json({
            msg: 'Contacte con el administrador'
        })

    }
    
}

export { login }