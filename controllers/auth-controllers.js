const { response, request } = require("express");

const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontEnd } = require('../helpers/menu-frontend');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar email

    /***
     * Es mejor colocar como msg Email y / o contraseña no valido, por terminos de seguridad
     */
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email no valido",
      });
    }

    // Verificar contraseña
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña no es valida",
      });
    }

    // Generar el Token = JWT
    const token = await generarJWT(Usuario.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const googleSignIn = async (req = request, res = response) => {

  const googleToken = req.body.token;

  try {

    const { name, email, picture } = await googleVerify(googleToken);

    const usuarioDB = await Usuario.findOne({ email });
    let usuario;

    if (!usuarioDB) {
      usuario = new Usuario({
        // si no existe el usuario
        nombre: name,
        email,
        password: '123456',
        img: picture,
        google: true
      });
    } else {
      // existe usuario
      usuario = usuarioDB;
      usuario.google = true;
      usuario.password = '@@@'
    }

    await usuario.save();

    // Generar el Token = JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      msg: 'Google Signin',
      token
    });

  } catch (error) {

    res.status(401).json({
      ok: false,
      msg: 'Token no es correcto',
    });

  }

}

const renewToken = async (req = request, res = response) => {

  const uid = req.uid;

  // Generar el TOKEN - JWT
  const token = await generarJWT(uid);

  // Obtener el usuario por UID
  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    token,
    usuario,
    menu: getMenuFrontEnd(usuario.role)
  });

}

module.exports = {
  login,
  googleSignIn,
  renewToken
};
