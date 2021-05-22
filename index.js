const express = require('express')
const usersRouter = require('./users/controller/UsersController');
const jwt = require('jsonwebtoken');

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