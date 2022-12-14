import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
const env = dotenv.config().parsed;

import { routerUsuario } from '../routes/usuario.js';
import { routerAuth } from '../routes/auth.js';
import { dbConnection } from '../db/config.js';

export default class Server {

    constructor(){
        this.app = express();
        this.port = env.PORT;
        this.usuarioPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // * Conectar a la base de datos
        this.conectarDB();


        // * MIDDLEWARES
        this.middlewares();

        // * RUTAS
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // * CORS
        this.app.use( cors() );

        // * lectura y parseo del body
        this.app.use( express.json() );

        // * Directorio publico
        this.app.use( express.static( 'public' ) );
    }

    routes() {
        this.app.use( this.authPath, routerAuth);
        this.app.use( this.usuarioPath, routerUsuario );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}