// dependencia framework de node
import express from 'express';

// validar ubicacion geografica de peticiones
import cors from 'cors';

// // solicitar conexion con base de datos
// import pool from '../database/config.js'




// solicitar rutas
import usuario from '../routes/usuario.js'

// crear clase constructor
class Server{
    constructor(){
        // puerto de conexion
        this.port = process.env.PORT;

        // servidor
        this.app = express();

        // conectar con bd
        // this.conectarDB();

        // middelwares
        this.middlewares();

       // rutas
       this.routes();
    }
    
    // async conectarDB(){
    //     await pool;
    // }

    // metodo para llamar los middlewares
    middlewares(){

        // leer json en rutas express
        this.app.use(express.json());

        // validar origen de rutas
        this.app.use(cors());

        //conectar con front-end
        this.app.use(express.static('public'));
    }

    // rutas
    routes(){
        this.app.use('/api/usuario',usuario)
    }

    // metodo para iniciar servidor
    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

//exportar clase servidor
export default Server