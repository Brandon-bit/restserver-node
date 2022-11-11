import { Router } from "express";
import { check } from "express-validator";
import { usuarioDelete, usuarioGet, usuarioPatch, usuarioPost, usuarioPut } from "../controllers/usuario.js";
import { emailExiste, esRolValido, idExiste } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const routerUsuario = Router();

routerUsuario.get('/', usuarioGet);

routerUsuario.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuarioPost);

routerUsuario.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( idExiste ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuarioPut);

routerUsuario.delete('/:id', usuarioDelete);

routerUsuario.patch('/', usuarioPatch);

export{ routerUsuario }