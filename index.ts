const express = require('express')
const jwt = require('jsonwebtoken');
import { usersRouter } from './users/controller/UsersController';
import { PostgresConnection } from './shared/repository/Connections';
import dotenv from 'dotenv';
import { usersMongoRouter } from './users/controller/UsersMongoController';
import { MongoConnection } from './shared/repository/MongoConnection';

dotenv.config();

async function main() {
    //LEVANTANDO CONNECTION CON POSTGRESQL
    await PostgresConnection.getConnection().connect();
    
    await MongoConnection.getConnection().connect();
    
    const app = express()
    const port = 8080;
    
    app.use(express.json())
    
    
    app.post('/signIn', (request, response) => {
        const { body } = request;
        const { user, password } = body;
        /*const user = body.user;
        const password = body.password;*/
        /** {id: 1, user: user} */
        const token = jwt.sign({ id: 1, user }, 'SECRET_KEY', {
            expiresIn: '1d'
        }) //GENERACIÓN DE TOKEN //JWT
        response.status(200).send({ token: token })
    });
    
    //MIDDLEWARE
    app.use((request, response, next) => {
        const token = request.headers.token;
        if (!token) {
            response.status(400).send({ message: 'No viene token' })
            return;
        }
        try {
            const decoded = jwt.verify(token, 'SECRET_KEY'); //JWT
            next()
        } catch (e) {
            response.status(400).send({ message: 'PROHIBIDO' })
        }
        //response.status(401).send({ message: 'PROHIBIDO' })
    });
    
    app.use(usersRouter);
    app.use(usersMongoRouter);
    
    app.get('',
        (request, response) => {
            response.status(201);
            response.send('Hello From GET')
        }
    )
    
    app.post('', (request, response) => {
        console.log(request.headers);
        console.log(request.query);
        response.status(201);
        response.send(request.body)
    })
    
    
    app.listen(port, () => {
        console.log(`App is running on Port ${port}`);
    })   
}

main()