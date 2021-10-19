// dependencia para encriptar
import bcryptjs from 'bcryptjs';

// operar con base de datos
import pool from '../database/config.js'

// funcioens de apoyo
import { generarJWT } from "../middlewares/validarJwt.js";
import { validarDireccionAgregarUser } from '../helpers/usuario.js';

//controlador general
const usuarioControllers = {

    //agregar usuario
    guardarUsuarioPost : async(req, res)=>{

        //capturar variables
        const {nombre, nombreUsuario, password, rol, ...resto} = req.body;

        // limpiar variables
        const name = nombre.toString().toLowerCase().trim();
        const nameUser = nombreUsuario.toString().toLowerCase().trim();
        const permisos = rol.toString().toLowerCase().trim();
        const pass = password.toString().trim()

        // propiedades no obligatorias
        var address = '';

        // validar email
        if(resto.direccion != undefined){
            let recibirDireccion = resto.direccion;
            address = recibirDireccion.toString().trim();
            let validar = await validarDireccionAgregarUser(address);
            if(validar != true){ return res.status(400).json({msg : `${validar}`})}
        }

        // crear objeto usuario
        const usuario = {
            nombre : name,
            nombreUsuario : nameUser,
            password : pass,
            rol : permisos,
            direccion : address
        }

        // numero de capaz para encriptar las password
        const salt = bcryptjs.genSaltSync(1);

        // encriptar password
        usuario.password = bcryptjs.hashSync(pass,salt);

        // guardar cliente
        const usuariobd = await  pool.query('INSERT INTO usuario set ?', [usuario],(err,rows)=>{
            if(err){
                console.log("error aca");
                console.log(err);
                return res.status(400).json({msg : `${err}`});
            }
            return res.json({msg:"Usuario agregado"})
        })
        return res.json({msg:"Usuario agregado"})
        
    },

    //iniciar sesion
    iniciarSesionUsuarioPost : async(req, res) =>{
        // capturar variable
        const { nombreUsuario, password} = req.body;

        //limpiar variables
        const nameUser = nombreUsuario.toString().toLowerCase().trim();
        const pass = password.toString().trim();

        //buscar usuario
        const user = await pool.query('SELECT * FROM usuario WHERE nombreUsuario = ?', [nombreUsuario]);

        //transforar en un objeto
        const usuario = JSON.parse(JSON.stringify(user[0]));

        //validar contraseña
        const validarPasswordLogin = bcryptjs.compareSync(pass, usuario.password);
        if(!validarPasswordLogin){
            return res.status(400).json({msg:"Usuairo y/o contraseña invalidos"})
        }

        const token = await generarJWT(usuario.id);
        
        res.json({
            nombreUsuario : usuario.nombreUsuario,
            rol : usuario.rol,
            id : usuario.id,
            token
        })

    },

    //traer lista de usuarios
    traerListaUsuariosGet : async(req, res)=>{
        console.log("entre");
        // capturar variable
        const valor = req.query.value;

        // buscar por id en la bd
        const user = await pool.query(`SELECT * FROM usuario WHERE nombre like '%${valor}%' or nombreUsuario like '%${valor}%' or rol like '%${valor}%'`);

        //transforar en un objeto
        const usuario = JSON.parse(JSON.stringify(user));

        // responder
        res.json({usuario})
    },

}

export default usuarioControllers