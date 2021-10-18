// variables de entorno
import {} from 'dotenv/config.js';

// immportar clase servidor
import Server from './models/server.js';

// crear instancia de servidor
const server = new Server();

// iniciar servidor
server.listen();