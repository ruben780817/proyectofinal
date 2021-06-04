import { ClientesApplication } from "../aplication/ClientesApplication";
import { Cliente } from "../dto/Clientes";
import { ClienteRepository } from "../repository/ClientesRepository";

const express = require('express')
const clientesRouter = express.Router()


//OBTENER LISTADO DE PRODUCTOS
clientesRouter.get('/Clientes', (request, response) => {
    const userApp = new ClientesApplication(new ClienteRepository());
    userApp.getAll().then(result => {
        response.status(201);
        response.send(result)
    })
})

//CREAR PRODUCTOS
clientesRouter.post('/Clientes', (request, response) => {
    const userApp = new ClientesApplication(new ClienteRepository());
    const { nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento  } = request.body;
    userApp.save(new Cliente( 0, nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento))
    .then(result => {
        response.status(201);
        response.send(result);
    }).catch(result => {
        response.status(500);
        response.send(result);
    });

})


//EDITAR UN PRODUCTO
clientesRouter.put('/Clientes/:id', (request, response) => {
    const userApp = new ClientesApplication(new ClienteRepository());
    const { nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento  } = request.body;
    userApp.update(new Cliente(0, nombre, apellidoPat, apellidoMat, edad, ciudad, fechaNacimiento), request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})

//OBTENER DETALLES DE LOS PRODUCTOS
clientesRouter.get('/Clientes/:id', (request, response) => {
    const userApp = new ClientesApplication(new ClienteRepository());
    userApp.getById(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})


clientesRouter.delete('/Clientes/:id',(request,response)=>{
    const userApp = new ClientesApplication(new ClienteRepository());
    userApp.delete(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
});

export { clientesRouter };