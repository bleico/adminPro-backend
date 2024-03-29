/**
 * ruta: api/todo/:busqueda
 */

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getTodo, getDocumentosColeccion } = require('../controllers/busquedas--controller')

const router = Router();

router.get('/:busqueda',
    [
        getTodo,
        validarJWT
    ]
)

router.get('/coleccion/:tabla/:busqueda', validarJWT, getDocumentosColeccion)


module.exports = router;