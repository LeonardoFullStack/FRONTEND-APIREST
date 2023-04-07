const { consulta, consulta2 } = require('../helpers/fetch')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


const mostrarAdmin = (req, res) => {

  res.render('admin/index', {
    titulo: 'Práctica node',
    msg: 'Has accedido como administrador'
  })
}

const mostrarServicios = async (req, res) => {
  const respuesta = await consulta2('', '', '')



  respuesta.data.forEach(element => {
    element.fecha = ajustarFecha(element.fecha)
  });


  res.render('admin/servicios', {
    titulo: 'Servicios',
    msg: 'Servicios disponibles:',
    data: respuesta.data
  })
}

const mostrarUnServicio = async (req, res) => {
  const id = req.params.id
  const respuesta = await consulta2(id, '', '')

  respuesta.data.fecha = ajustarFecha(respuesta.data.fecha)

 


  res.render('admin/uno', {
    titulo: 'Servicio',
    msg: 'Servicio seleccionado:',
    data: respuesta.data
  })
}

const eliminar = async (req, res) => {

  const id = req.params.id
  const respuesta = await consulta2(id, 'delete', '')
  if (respuesta.ok) {
    res.render('admin/index', {
      titulo: 'Servicio',
      msg: 'Servicio eliminado',
    })
  }




}

const editar = async (req, res) => {
  const id = req.params.id
  const respuesta = await consulta2(id)
  
  res.render('admin/editar', {
    titulo: 'Editar',
    msg: 'Editar servicio',
    data: respuesta.data
  })
}

const put = async (req, res) => {

  const id = req.params.id
  const respuesta = await consulta2(id, 'put', req.body)
  if (respuesta.ok) {

    respuesta.data.fecha = ajustarFecha(respuesta.data.fecha)

    res.render('admin/servicios', {
      titulo: 'Editado',
      msg: 'Servicio editado',
      data: respuesta
    })
  } else {
    res.render('error', {
      error: 'Fallo al editar',
      msg: 'Fallo al editar el servicio'
    })
  }
}

const crear = (req, res) => {

  res.render('admin/crear', {
    titulo: 'Crear servicio',
    msg: 'Crea aqui tu servicio',
  })
}

const post = async (req, res) => {
  const { descripcion, servicio } = req.body

  
  if (descripcion.length == 0 || servicio.length == 0) {
    res.render('error', {
      error: 'ERROR',
      msg: 'Rellena los dos campos'
    })
  } else {

    const respuesta = await consulta2('', 'post', req.body)
    if (respuesta.ok) {
      respuesta.data.fecha = ajustarFecha(respuesta.data.fecha)
      res.render('admin/servicios', {
        titulo: 'Servicios',
        msg: 'Servicio creado',
        data: respuesta
      })
    } else {
      res.render('error', {
        error: 'ERROR',
        msg: 'Fallo al crear el servicio'
      })
    }
  }

}

const ajustarFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const anio = fechaNueva.getFullYear();
  const mes = fechaNueva.getMonth() + 1;
  const dia = fechaNueva.getDate();
  return `${dia}-${mes}-${anio}`
}

const validar = (req, res, next) => {

  const {xtoken} = req.cookies

  try {
    const payload = jwt.verify(xtoken, 'esta es la frasecilla')

  } catch (error) {
    res.render('error', {
      error: error,
      msg: 'No tienes permisos'
    })
  }
  next();

}

const logout = (req,res) => {
  res.clearCookie('xtoken')
  res.render('index', {
    titulo:'Sesión cerrada',
    msg:'Sesión cerrada con éxito'
  })
}





module.exports = {
  mostrarAdmin,
  mostrarServicios,
  mostrarUnServicio,
  eliminar,
  editar,
  put,
  crear,
  post,
  ajustarFecha,
  validar,
  logout
}