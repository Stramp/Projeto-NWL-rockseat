import express from 'express';

const app = express();
const port = "3666";

/**
 * req > recebe os dados
 * resp > devolve os dados
 * 
 */

app.get('/users', (req, resp) => {
    console.log('hello word');
    resp.json({
        nome: "rafa",
        sobrenome: "stramp",
        cidade: "sao paulo"
    })
})

app.listen(port);

console.log("servidor rodando na porta:", port)