import mongoose from 'mongoose';

import dotenv from 'dotenv';
const env = dotenv.config().parsed;

const dbConnection = async() => {

    console.log(env.MONGODB_ATLAS);

    try{

        mongoose.connect( env.MONGODB_ATLAS );
        console.log('Base de datos online');

    } catch( error ){

        console.log( error );
        throw new Error('Error a la hora de conectarse a la base de datos');

    }

}

export { dbConnection }