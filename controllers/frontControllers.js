const { consulta2, logUser } = require('../helpers/fetch')
const { ajustarFecha } = require('./adminController')
const path = require('path')


const getIndex = (req, res) => {
  req.header.authorization = ''
  res.render('index', {
    titulo: 'Práctica node',
    msg: 'Haz login para comenzar'
  })
};

const getServicios = async (req, res) => {
  const respuesta = await consulta2('', '', '')


  console.log(respuesta.data);
  respuesta.data.forEach(element => {
    element.fecha = ajustarFecha(element.fecha)
  });


  res.render('servicios', {
    titulo: 'Servicios',
    msg: 'Servicios disponibles:',
    data: respuesta.data
  })
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
      titulo: 'Error',
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
  req.header.authorization = ''

  const respuesta = await logUser(req.body);

  if (respuesta.ok) {
    req.header.authorization = 'entrada'

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