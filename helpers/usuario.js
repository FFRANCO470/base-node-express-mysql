// operar con base de datos
import pool from '../database/config.js'


const existeUsuarioByNombreUsuario = async (nombreUsuario)=>{
    // limpir variable
    nombreUsuario = nombreUsuario.toString().toLowerCase().trim();

    //no estar vacio
    if(nombreUsuario.length==0){
        throw new Error("Nombre de usuario vacio");
    }

    //validar longitud
    if(nombreUsuario.length > 50){
        throw new Error("Nombre de usuario supero los 50 caracteres")
    }

    // traer usuarios de la bd
    const usuario = await pool.query('SELECT * FROM usuario WHERE nombreUsuario = ?', [nombreUsuario]);

    //transforar en un objeto
    const user = JSON.parse(JSON.stringify(usuario));

    // validar que este vacio
    if(user.length>0){
        throw new Error("Usuario ya existente")
    }
}

// validar contraseña
const validarPassword = async (password)=>{
    //limpiar variable
    password = password.toString().trim();
    // validar longitud
    if(password.length > 10){
        throw new Error("Contraseña supero los 10 caracteres")
    }
    if(password.length == 0){
        throw new Error("Contraseña vacia")
    }
}

// valiar rol de usuario
const validarRolUsuario = async (rol)=>{
    // limpiar variable
    rol = rol.toString().toLowerCase().trim()
    if(rol != "administrador" && rol != 'vendedor'){
        throw new Error("Rol de usuario invalido")
    }
}

const validarDireccionAgregarUser = async (direccion)=>{
    //limpiar variable
    direccion = direccion.trim();
    if(direccion.length > 50){
        return "Direccion supero los 50 caracteres"
    }
    return true
}

export {
    existeUsuarioByNombreUsuario,
    validarPassword,
    validarRolUsuario,
    validarDireccionAgregarUser
}