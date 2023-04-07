const express=require('express');
const router=express.Router();
const bodyParser = require('body-parser');
const {getIndex, getServicios, mostrarUnServicio, login, comprobar, getStaticPage, getDinamicPage} = require('../controllers/frontControllers')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', getIndex)

router.get('/login', login);

router.post('/comprobar/', comprobar);

router.get('/static', getStaticPage);

router.get('/dinamic', getDinamicPage)

router.get('/servicios', getServicios);

router.get('/uno/:id', mostrarUnServicio);

module.exports = router