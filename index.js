require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Crear servidor express
const app = express();

// Configura CORS
app.use(cors())

// Base de datos
dbConnection();
 
app.get('/', (req, res) => {
    
    res.json({
        ok: true,
        msg: 'Hola Mundo'
    })
});


/**
 * user: mean_user
 * Pass: mqpIgzxKozDJ4dIM
 *   mongodb+srv://mean_user:mqpIgzxKozDJ4dIM@cluster0.uzxvp.mongodb.net/hospitaldb
 */
// Rutas
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ', process.env.PORT);
} );