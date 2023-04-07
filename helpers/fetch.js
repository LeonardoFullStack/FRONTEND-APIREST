const urlBase = 'https://api-proyecto-975q.onrender.com/api/v1/servicios'


const consulta2 = async (url, method, body) => {
    let options={}
    if(method=='post' || method=='put'){
    const {servicio,descripcion}=body
       const data={...body};
         options={
            method:method,
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            }
        }
    }
    if(method=='delete'){
        options={
            method: method, //mirar si hay que mandar mas cosas en el delete
        }
    }
    if(method=='get'){
        options={
            method: method,
        }
    }
    const peticion = await fetch(`${urlBase}/${url}`,options);
     const respuesta = await peticion.json()
     
     return respuesta
     
}

const logUser =async (req,res) => {
    const datos = {
        email: req.email,
        pass: req.pass
    }


    const respuesta = await fetch('https://api-proyecto-975q.onrender.com/api/v1/users/',  {
    method: 'POST',
    body:JSON.stringify(datos),
    headers: {
        'Content-Type': 'application/json'
    }
    })
    peticion = await respuesta.json()
    return peticion
}

module.exports = {

    consulta2,
    logUser
}