const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const {mostrarAdmin,logout, mostrarServicios, mostrarUnServicio, eliminar, editar, put, crear, post, validar} = require('../controllers/adminController')


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(validar)

router.get('/', mostrarAdmin)
router.get('/servicios', mostrarServicios)
router.get('/uno/:id', mostrarUnServicio)
router.get('/edit/:id', editar)
router.get('/crear/', crear)
router.get('/eliminar/:id', eliminar)
router.get('/logout', logout)

router.post('/post/', post)
router.post('/put/:id', put)




module.exports = router

