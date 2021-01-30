/**
 * user: mean_user
 * Pass: mqpIgzxKozDJ4dIM
 *   mongodb+srv://mean_user:mqpIgzxKozDJ4dIM@cluster0.uzxvp.mongodb.net/hospitaldb
 */
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor express
const app = express();

// Configura CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuarios-route') );
app.use('/api/login', require('./routes/auth-route')); 

// Rutas
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
} );