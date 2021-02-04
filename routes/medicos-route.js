/**
 * Medico
 * ruta: '/api/medico'
 */

const { Router } = require("express");
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  getMedicos,
  creatMedico,
  actualizarMedico,
  borrarMedico 
} = require('../controllers/medicos-controller');

const router = Router();

router.get("/", getMedicos);

router.post('/',
  [
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'El id del hospital debe ser valido').isMongoId(),
    validarCampos
  ],
  creatMedico);

router.put('/:id',
  [
    
  ],
  actualizarMedico);

router.delete('/:id',
  [
    
   borrarMedico
  ]);

module.exports = router;

