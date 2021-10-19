// dependencia para enrutar
import { Router } from "express";

// chequiar rutas
import { check } from "express-validator";

//importar controladores
import usuarioControllers from '../controllers/usuario.js';

// funciones personalizadas
import { validarCampo } from "../middlewares/validarCampos.js"
import { validarJWR } from "../middlewares/validarJWT.js";
import { validarRol} from "../middlewares/validarRol.js";
import {
    existeUsuarioByNombreUsuario,
    validarPassword,
    validarRolUsuario,
} from "../helpers/usuario.js"



// metodo de enrutar
const router = Router();

router.post('/agregar',[
    check('nombreUsuario','Nombre de usuario obligatorio').not().isEmpty(),
    check('password','constraseña de usuario obligatoria').not().isEmpty(),
    check('rol','Rol de usuario obligatorio').not().isEmpty(),

    check('nombreUsuario').custom(existeUsuarioByNombreUsuario),
    check('password').custom(validarPassword),
    check('rol').custom(validarRolUsuario),

    validarCampo
],usuarioControllers.guardarUsuarioPost);


export default router