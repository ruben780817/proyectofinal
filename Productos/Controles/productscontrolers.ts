import { ProductoApplication } from "../application/ProductsApplication";
import { Producto } from "../dto/Producto";
import { ProductoRepository } from "../repository/ProductoRepository";

const express = require('express')
const productsRouter = express.Router()

//OBTENER LISTADO DE PRODUCTOS
productsRouter.get('/productos', (request, response) => {
    const userApp = new ProductoApplication(new ProductoRepository());
    userApp.getAll().then(result => {
        response.status(201);
        response.send(result)
    })
})

//CREAR PRODUCTOS
productsRouter.post('/productos', (request, response) => {
    const userApp = new ProductoApplication(new ProductoRepository());
    const { nombre, descripcion, presentacion, marca, caducidad, existencia  } = request.body;
    userApp.save(new Producto( 0, nombre, descripcion, presentacion, marca, new Date(caducidad), existencia )).then(result => {
        response.status(201);
        response.send(result);
    });

})

//EDITAR UN PRODUCTO
productsRouter.put('/productos/:id', (request, response) => {
    const userApp = new ProductoApplication(new ProductoRepository());
    const { nombre, descripcion, presentacion, marca, caducidad, existencia  } = request.body;
    userApp.update(new Producto(0,nombre, descripcion, presentacion, marca, new Date(caducidad), existencia), request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})

//OBTENER DETALLES DE LOS PRODUCTOS
productsRouter.get('/productos/:id', (request, response) => {
    const userApp = new ProductoApplication(new ProductoRepository());
    userApp.getById(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
})

productsRouter.delete('/productos/:id',(request,response)=>{
    const userApp = new ProductoApplication(new ProductoRepository());
    userApp.delete(request.params.id).then(result => {
        response.status(201);
        response.send(result);
    });
});

export { productsRouter };