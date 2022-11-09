import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
const env = dotenv.config().parsed;

import {routerUsuario} from '../routes/usuario.js';

export default class Server {

    constructor(){
        this.app = express();
        this.port = env.PORT;
        this.usuarioPath = '/api/usuarios';

        // * MIDDLEWARES
        this.middlewares();

        // * RUTAS
        this.routes();
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
        this.app.use( this.usuarioPath, routerUsuario );
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        })
    }
}