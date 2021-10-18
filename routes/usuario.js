// dependencia para enrutar
import { Router } from "express";

//importar controladores
import usuarioControllers from '../controllers/usuario.js';

// metodo de enrutar
const router = Router();

router.post('/agregar',usuarioControllers.guardarUsuarioPost);


export default router