// importar dependencias y recursos a usar
import jwt from 'jsonwebtoken';

// operar con base de datos
import pool from '../database/config.js'

const generarJWT = (uid = '')=>{
    
    return new Promise((resolve, reject)=>{

        const payload = {uid}

        //crear enciptacion
        jwt.sign(payload, process.env.SECREPRIVATEKEY,{
            //tiempo de duracion
            expiresIn:'7d'
        },(err,token)=>{
            if(err){
                reject('No se pudo generar token')
            }else{
                resolve(token)
            }
        })
    })
}

const validarJWR = async(req, res, next) =>{
    // capturar variable token
    const token = req.header('token');

    // verificar que no este vacio
    if(!token){
        return res.status(400).json({msg:"No hay token en la peticion"})
    }

    try{
        // desencriptar token
        const {uid} = jwt.verify(token,process.env.SECREPRIVATEKEY);

        //buscar usuario
        const user = await pool.query('SELECT * FROM usuario WHERE id = ?', [uid]);

        //transforar en un objeto
        const usuario = JSON.parse(JSON.stringify(user[0]));

        //validar que exista usuario
        if(!usuario){
            return res.status(400).json({msg : "No existe usuario para ese token"})
        }

        req.usuario = usuario
        next()

    }catch(error){
        return res.status(401).json({msg : "Token invalido"})
    }

}


//exportar funciones de validacion y creacion de token
export {generarJWT, validarJWR}