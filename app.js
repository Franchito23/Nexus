//---- IMPORTS, LAS DEPENDENCIAS NO NECESITAN LA EXTENSIÓN ----
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import db from './config/db.js';

// CREAMOS LA APP
const app = express();

//HABILITAR LECTURA DE DATOS EN FORM
app.use( express.urlencoded({extended: true}) );

//CONEXIÓN A BASE DE DATOS
try {
    await db.authenticate();
    db.sync()
    console.log('Conexion correcta a la base de datos');
} catch (error) {
    console.log(error);
}

//HABILITAR PUG
app.set('view engine', 'pug');
app.set('views', 'views');

//Carpeta de archivos staticos
app.use(express.static('public'))

//Routing
app.use('/auth', userRoutes);


//PUERTO
const port = 3000;
app.listen(port, () => {
    console.log('El servidor está corriendo');
});