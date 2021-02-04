// getTodo

const { request, response } = require('express');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async (req = request , res = response) => {

    const busqueda = await req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        usuarios = Usuario.find({ nombre: regex }),
        medicos = Medicos.find({ nombre: regex }),
        hospitales = Hospital.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        hospitales
    })
}

const getDocumentosColeccion = async (req = request, res = response) => {
    
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = []; 

    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({ nombre: regex })
                .populate('usuario', 'nombre, img')
                .populate('hospital', 'nombre, img');
            break;
    
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                .populate('usuario', 'nombre, img');
            break;
        
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
            });        
    }

    res.json({
        ok: true,
        resultados: data
    });

}

module.exports = {
    getTodo,
    getDocumentosColeccion
}