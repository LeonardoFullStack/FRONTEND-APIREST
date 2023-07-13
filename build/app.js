"use strict";

var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').config();
var port = process.env.PORT || 4000;
/* const {validar} = require('./controllers/frontControllers') */

//establecer templates 
app.set('view engine', 'ejs');
app.use(express["static"](__dirname + '/public'));
app.use(cookieParser());
app.use('/', require('./routers/routerFront'));
app.use('/admin', require('./routers/routerAdmin'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.status(404).render('404', {
    error: '404',
    msg: 'pàgina no encontrada'
  });
});
app.listen(port, function () {
  console.log("servidor a la escucha ".concat(port));
});