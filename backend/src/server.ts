import express from 'express';
import rotas from './router';
import path from 'path';

const app = express();
const port = "3666";

app.use(express.json());
app.use(rotas);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'temp', 'uploads')));

app.listen(port);

console.log("servidor rodando na porta:", port)