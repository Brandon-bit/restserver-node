import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
const env = dotenv.config().parsed;

const generarJWT = ( uid ) => {
    
    return new Promise( ( resolve, reject ) => {

        const payload = { uid };

        jwt.sign( payload, env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if( err ){
                console.log( err );
                reject( "No se pudo generar el token" );
            } else {
                resolve( token );
            }
        })

    })
}

export { generarJWT }