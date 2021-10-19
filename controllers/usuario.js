// dependencia para encriptar
import bcryptjs from 'bcryptjs';

// oprtst con base de datos
import pool from '../database/config.js'

//controlador general
const usuarioControllers = {

    //agregar usuario
    guardarUsuarioPost : async(req,res)=>{
        console.log("entre");

        //capturar variables
        const {nombre, nombreUsuario, password, rol, ...resto} = req.body;

        // limpiar variables
        const name = nombre.toString().toLowerCase().trim();
        const nameUser = nombreUsuario.toString().toLowerCase().trim();
        const permisos = rol.toString().toLowerCase().trim();
        const pass = password.toString().trim()

        // propiedades no obligatorias
        var address = '';

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
        
        console.log(usuario);

        // guardar cliente
        const usuariobd = await  pool.query('INSERT INTO usuario set ?', [usuario],(err,rows)=>{
            if(err){
                console.log("error aca");
                console.log(err);
            }
            return res.json({rows})
        })

        res.json({usuariobd})
        
    }
}

export default usuarioControllers