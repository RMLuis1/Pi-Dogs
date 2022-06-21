# App Dogs

## Introduccion

Proyecto individual realizado para presentar en HenryBootcamp. Un sitio web consume una API (REST Countries) para traerse información de razas de perros y solo las guarda los temperamentos en su propia base de datos (PostgreSQL). Luego utilizamos esta información en diferentes rutas para permitirle al usuario interactuar y poder observar  las distintas razas (Puede crear las mismas a través de un formulario controlado), sus principales caracteristicas y otros datos de interés. En otras funcionalidades el usuario también puede buscar razas por nombre , filtrarlos(por temperamentos) y ordenarlos (alfabéticamente, peso, y altura).

## Tecnologias utilizadas: 

Lenguaje: JavaScript
Base de datos: PostgreSQL
Back-End: NodeJs, ExpressJs, Sequelize
Front-End: React, Redux, CSS

## Probar el repositorio

*En primera instancia se debe clonar el repositorio de forma local.

Despues de clonar el repositorio.

Crear un archivo .env con las variables de entorno necesarias para la conexion a la base de datos en la carpeta api.
        
    DB_USER=usuariodepostgres; DB_PASSWORD=passwordDePostgres; DB_HOST=localhost

Crear una base de datos con el nombre de la aplicacion y la contraseña. abrir la consola de postgres y ejecutar el comando:
        
    CREATE USER "usuario" PASSWORD 'contraseña'; CREATE DATABASE "dogs" ;
    

#Volver al proyecto y dividir la terminal en dos
    
En la primer terminal ejecutar el comando:
    
    cd api y ejecutar el comando: npm install para instalar las dependencias y ejecutar el comando: npm start para iniciar el servidor.
    
    
En la segunda terminal ejecutar el comando: 
    
    
    cd client y ejecutar el comando: npm install para instalar las dependencias y ejecutar el comando: npm start para iniciar el servidor.


## Imagenes 
