# App Dogs

## Introduccion


Proyecto individual realizado en el Bootcamp de Henry. Es una SPA que consume una API (REST Dogs) y solo las almacena los temperamentos en su propia base de datos. Luego utilizamos toda la información en diferentes rutas para permitirle al usuario interactuar y poder observar las distintas razas, sus principales características y otros datos de interés. En otras funcionalidades el usuario también puede buscar por nombres, filtrar por temperamentos y ordenarlos (alfabéticamente, peso, y altura). 


## Tecnologias utilizadas: 


Lenguaje: JavaScript
Base de datos: PostgreSQL
Back-End: NodeJs, ExpressJs, Sequelize
Front-End: React, Redux, CSS

## Probar poyecto deployado

https://pi-dogs-bice.vercel.app

## Probar el repositorio


\*En primera instancia se debe clonar el repositorio de forma local.


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

![landin](/image/landing.jpeg)
![home](/image/home.jpeg)
![detalle](/image/detalle.jpeg)
![form](/image/form.jpeg)
