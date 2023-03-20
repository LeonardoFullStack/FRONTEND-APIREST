const { consulta2, logUser } = require('../helpers/fetch')
const { ajustarFecha } = require('./adminController')
const path = require('path')


const getIndex = (req, res) => {
  res.render('index', {
    titulo: 'Práctica node',
    msg: 'Haz login para comenzar'
  })
};

const getServicios = async (req, res) => {
  const respuesta = await consulta2('', '', '')

  if (respuesta.ok) {
    respuesta.data.forEach(element => {
      element.fecha = ajustarFecha(element.fecha)
    });
  
  
    res.render('servicios', {
      titulo: 'Servicios',
      msg: 'Servicios disponibles:',
      data: respuesta.data
    })
  } else{
    res.render('error', {
      error: 'Error',
      msg: 'Fallo al obtener los servicios'
    })
  }

};

const mostrarUnServicio = async (req, res) => {
  const id = req.params.id
  const respuesta = await consulta2(id)
  if (respuesta.ok){
    respuesta.data.fecha = ajustarFecha(respuesta.data.fecha)


  res.render('uno', {
    titulo: 'Servicio',
    msg: 'Servicio seleccionado:',
    data: respuesta.data
  })

  } else {
    res.render('error', {
      error: 'Error',
      msg: 'Fallo al obtener el servicio'
    })
  }
  }




const login = (req, res) => {

  res.render('login', {
    titulo: 'Práctica node',
    msg: 'Haz login para comenzar'
  })
}

const comprobar = async (req, res) => {

  const respuesta = await logUser(req.body);

  if (respuesta.ok) {
    const token = respuesta.token 
    req.header.authorization = 'entrada'
    req.body.id = respuesta.user._id;
    req.body.name = respuesta.user.nombre
    req.header.xtoken = token 

    res.redirect(`/admin`)
  } else {
    res.render('error', {
      error: 'Fallo al validar',
      msg: 'Usuario o contraseña incorrectos'
    })
  }


}




module.exports = {
  getIndex,
  getServicios,
  mostrarUnServicio,
  login,
  comprobar,

}