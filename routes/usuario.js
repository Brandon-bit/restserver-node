import { Router } from "express";
import { usuarioDelete, usuarioGet, usuarioPatch, usuarioPost, usuarioPut } from "../controllers/usuario.js";

const routerUsuario = Router();

routerUsuario.get('/', usuarioGet);
routerUsuario.post('/', usuarioPost);
routerUsuario.put('/:id', usuarioPut);
routerUsuario.delete('/', usuarioDelete);
routerUsuario.patch('/', usuarioPatch);

export{ routerUsuario }