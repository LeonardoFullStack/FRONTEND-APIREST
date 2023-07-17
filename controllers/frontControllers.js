const { consulta2, logUser } = require('../helpers/fetch')
const { ajustarFecha } = require('./adminController')
const path = require('path')
const {webScraping} = require('../helpers/scrapping')
const cookieParser = require('cookie-parser')


const getIndex = (req, res) => {
  res.render('index', {
    titulo: 'Práctica node',
    msg: 'Haz login para comenzar'
  })
};

const getServicios = async (req, res) => {
  const respuesta = await consulta2('servicios', '', '')

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
    res.cookie('xtoken', token)
    

    res.redirect(`/admin`)
  } else {
    res.render('error', {
      error: 'Fallo al validar',
      msg: 'Usuario o contraseña incorrectos'
    })
  }


}

const getStaticPage = (req,res) => {
  res.render('staticServices', {
    titulo:'Servicios estáticos',
    msg:'Aquí los servicios estáticos'
  })
}

const getDinamicPage =async  (req,res) => {
  const scrapping = await webScraping()

  res.render('dinamic', {
    title:'Servicios  dinámicos',
    msg:'Los servicios de esta página por scrapping',
    scrapping
  })
}




module.exports = {
  getIndex,
  getServicios,
  mostrarUnServicio,
  login,
  comprobar,
  getStaticPage,
  getDinamicPage

}