const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const port = 3005
/* const {validar} = require('./controllers/frontControllers') */


//establecer templates 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));



app.use('/',require('./routers/routerFront'))
app.use('/admin',require('./routers/routerAdmin'))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.status(404).render('404', {
      error: '404',
      msg: 'pàgina no encontrada'
    })
  })

app.listen(port ,()=>{
    console.log(`servidor a la escucha ${port}`)
})