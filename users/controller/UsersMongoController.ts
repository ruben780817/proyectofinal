import { Router } from 'express';
import { UserApplication } from '../application/UserApplication';
import { User } from '../dto/User';
import { UserMongoRepository } from '../repository/UserMongoRepository';

const usersMongoRouter = Router();

usersMongoRouter.get('/mongoUsers', (request, response) => {
    //Inyectamos la dependencia del repository o DAO
    const userApp = new UserApplication(new UserMongoRepository());

    userApp.getAll().then(users => {
        response.status(200).send(users);
        return;
    });
})

//CREAR USUARIOS
usersMongoRouter.post('/mongoUsers', (request, response) => {
    //Inyectamos la dependencia del repository o DAO
    const userApp = new UserApplication(new UserMongoRepository());

    const { name, password, userName } = request.body;
    userApp.save(new User(name, userName, password)).then(user => {
        response.status(200).send(user);
        return;
    });
})

//EDITAR UN USUARIO
usersMongoRouter.put('/mongoUsers/:id', (request, response) => {
    //Inyectamos la dependencia del repository o DAO
    const userApp = new UserApplication(new UserMongoRepository());

    const { name, password, userName } = request.body;
    const { id } = request.params;
    userApp.update(new User(name, userName, password), id).then(user => {
        response.status(200).send(user);
        return;
    });
})

//OBTENER DETALLES DE LOS USUARIOS
usersMongoRouter.get('/mongoUsers/:id', (request, response) => {
    //Inyectamos la dependencia del repository o DAO
    const userApp = new UserApplication(new UserMongoRepository());

    const { id } = request.params;
    userApp.getById(id).then(user => {
        response.status(200).send(user);
    });
})

export { usersMongoRouter };