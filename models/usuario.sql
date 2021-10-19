-- crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS dblinks;

-- invocar para usar
USE dblinks;

-- crear tabla 
CREATE TABLE usuario(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    nombreUsuario VARCHAR(50) NOT NULL,
    password VARCHAR(150) NOT NULL,
    rol VARCHAR(30) NOT NULL,
    direccion VARCHAR(50),
    created_At timestamp NOT NULL DEFAULT current_timestamp
);

-- mostrar tablas de la bd
SHOW TABLES;

-- ver estructura de la tabla
describe usuario;