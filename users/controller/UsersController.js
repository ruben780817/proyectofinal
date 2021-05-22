const express = require('express')
const usersRouter = express.Router()

usersRouter.get('/users', (request, response) => {
    console.log(request.headers);
    console.log(request.query);
    response.status(201);
    response.send('Hello From GET')
})

usersRouter.post('/users', (request, response) => {
    console.log(request.headers);
    console.log(request.query);
    response.status(201);
    response.send(request.body)
})

//PATHPARAM
usersRouter.get('/users/:id', (request, response) => {
    response.status(201);
    response.send(`Buscaré ${request.params.id}`)
})

module.exports =[usersRouter]