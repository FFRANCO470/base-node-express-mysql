// dependencia para intereactuar con sql
import mysql from 'mysql';

// pasar codigo de promesa y async a lenguaje callback
import { promisify } from 'util';

// capturar configuracion de la bd
// const database = process.env.DATABASE;

// const database ={
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'database_links'
// }

// const { host, user, password, database }  = process.env.DATABASE
var  database   = process.env.DATABASE;
// var  database   = process.env.DATABASE_NUVE;
var  database   = JSON.parse(database);

// crear conexion con base de datos
const pool = mysql.createPool(database);


pool.getConnection((err,connection)=>{
    if(err){
        // error porque se perdio la conexion con la bd
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('La conexion con la base de datos fue cerrada');
        }

        // cantidad de conecciones hay con la bd
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('La base de datos tiene muchas conexiones');
        }

        // coneccion a base de datos rechazada
        if(err.code === 'ECONNREFUSED'){
            console.error('Se rechazo la conexion con la base de datos');
        }

        if(err.code === "ERR_MODULE_NOT_FOUND"){
            console.error("Modulo no encontrado");
        }
        
        if(err.code === "ER_ACCESS_DENIED_ERROR"){
            console.error(`${err.sqlMessage}`)
        }
    }else{
        connection.release();
        console.log('conectado a base de datos');
        
    }   

    return;
})

pool.query = promisify(pool.query);

export default pool