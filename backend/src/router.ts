import express from 'express';
import ControllersPonto from './database/controls/ControllersPonto';
import ControllersItens from './database/controls/ControllersItens';

const rotas = express.Router();
const controlPonto = new ControllersPonto();
const controlItens = new ControllersItens();

rotas.post('/ponto-de-coleta', controlPonto.create);
rotas.get('/ponto-de-coleta/:id', controlPonto.show);
rotas.get('/ponto-de-coleta/', controlPonto.index);
rotas.get('/todos-pontos/', controlPonto.allIndex);
rotas.get('/itens', controlItens.index);

export default rotas;