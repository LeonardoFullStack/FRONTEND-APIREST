const { consulta, consulta2 } = require('../helpers/fetch')
/* const express = require('expres')
const bodyParser = require('body-parser')

app.use(bodyParser.json()); */


const mostrarAdmin = (req, res) => {
  console.log('holi')
  res.render('admin/index', {
    titulo: 'Práctica node',
    msg: 'Mensaje Admin'
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

  console.log(respuesta)


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
  console.log(respuesta.data.servicio)
  res.render('admin/editar', {
    titulo: 'Editar',
    msg: 'Editar servicio',
    data: respuesta.data
  })
}

const put = async (req, res) => {

  console.log(req.body)
  const id = req.params.id
  const respuesta = await consulta2(id, 'put', req.body)
  if (respuesta.ok) {

    respuesta.data.fecha = ajustarFecha(respuesta.data.fecha)

    console.log(respuesta)
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

const ajustarFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const anio = fechaNueva.getFullYear();
  const mes = fechaNueva.getMonth() + 1;
  const dia = fechaNueva.getDate();
  return `${dia}-${mes}-${anio}`
}

const validar = (req, res, next) => {
  console.log('yes?')
  if (req.header.authorization == 'entrada') {
    next();
  } else {
    res.render('error', {
      error: '401',
      msg: 'No tienes permisos'
    })
  }
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
  validar
}