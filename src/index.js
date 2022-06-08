const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const costumers = [];
/*
cpf - string
name - string
id - uuid
statement - []

 */

app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    const id = uuidv4();
    costumers.push({ cpf, name, id, statement:[] });
    console.log(costumers);
    return response.status(201).send();
});

app.listen(3000);