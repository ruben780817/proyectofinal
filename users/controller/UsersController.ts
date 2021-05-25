import { UserApplication } from "../application/UserApplication";
import { User } from "../dto/User";
import { UserRepository } from "../repository/UserRepository";

const express = require('express')
const usersRouter = express.Router()

//OBTENER LISTADO DE USUARIOS
usersRouter.get('/users', (request, response) => {
    const userApp = new UserApplication(new UserRepository());
    userApp.getAll().then(result => {
        response.status(201);
        response.send(result)
    })
})

//CREAR USUARIOS
usersRouter.post('/users', (request, response) => {
    const userApp = new UserApplication(new UserRepository());
    const { name, password, userName } = request.body;
    userApp.save(new User(name, userName, password)).then(result => {
        response.status(201);
        response.send(result);
    });

})

//EDITAR UN USUARIO
usersRouter.put('/users/:id', (request, response) => {
    const userApp = new UserApplication(new UserRepository());
    const { name, userName } = request.body;
    userApp.update(new User(name, userName, ''), request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})

//OBTENER DETALLES DE LOS USUARIOS
usersRouter.get('/users/:id', (request, response) => {
    const userApp = new UserApplication(new UserRepository());
    userApp.getById(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})

export { usersRouter };