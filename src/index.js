const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const costumers = [];
// Middleware

function verifyIfExistsAccount(request,response, next){
    const cpf = request.headers;

    const costumer = costumers.find(costumer => costumer.cpf === cpf);
    if(!costumer){
        return response.status(400).json({error: 'Cliente nâo encontrado'})
    }
    request.costumer = costumer;
    next();
}
/*
cpf - string
name - string
id - uuid
statement - []

 */

app.post('/account', (request, response) => {
    const { cpf, name } = request.body;
    const costumerAlreadyExists = costumers.some(
        (costumer) => costumer.cpf === cpf
    );
    if(costumerAlreadyExists){
        return response.status(400).json({error: "CPF já cadastrado"});
    }
    costumers.push({ cpf, name, id : uuidv4(), statement:[] });
    console.log(costumers);
    return response.status(201).send();
});
app.get('/statement/:cpf',verifyIfExistsAccount, (request, response) => {
        const { costumer } = request;
        return response.json(costumer.statement)
});
app.post('/deposit',verifyIfExistsAccount,(request,response) => {
    const { description, amount } = request.body;
    const { costumer } = request;
    const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: 'credit'
    }
    costumer.statement.push(statementOperation);

    return  response.status(201).send();
});

app.listen(3000);


