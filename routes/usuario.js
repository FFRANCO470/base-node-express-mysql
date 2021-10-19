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
    validarExisteNombreUsuario
} from "../helpers/usuario.js"



// metodo de enrutar
const router = Router();

// agregar usuario
router.post('/agregar',[
    check('nombreUsuario','Nombre de usuario obligatorio').not().isEmpty(),
    check('password','constraseña de usuario obligatoria').not().isEmpty(),
    check('rol','Rol de usuario obligatorio').not().isEmpty(),

    check('nombreUsuario').custom(existeUsuarioByNombreUsuario),
    check('password').custom(validarPassword),
    check('rol').custom(validarRolUsuario),

    validarCampo
],usuarioControllers.guardarUsuarioPost);

// iniciar sesion
router.post('/iniciarSesion',[
    check('nombreUsuario','Nombre de usuario obligatorio').not().isEmpty(),
    check('password','constraseña de usuario obligatoria').not().isEmpty(),

    check('nombreUsuario').custom(validarExisteNombreUsuario),
    check('password').custom(validarPassword),

    validarCampo
],usuarioControllers.iniciarSesionUsuarioPost);

// listar los usuarios de la bd
router.get('/listarUsuarios',[
    validarJWR,
    validarRol(),
    validarCampo
],usuarioControllers.traerListaUsuariosGet);


export default router