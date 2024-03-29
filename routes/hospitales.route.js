/**
 * Hospitales
 * ruta: '/api/hospitales'
 */

const { Router } = require("express");
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  getHospitales,
  creatHospital,
  actualizarHospital,
  borrarHospital
} = require('../controllers/hospitales-controller');

const router = Router();

router.get("/", getHospitales);

router.post('',
  [
    validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    validarCampos
  ],
  creatHospital);

router.put('/:id',
  [
    
  ],
  actualizarHospital);

router.delete('/:id',
  [
    
   borrarHospital
  ]);

module.exports = router;

