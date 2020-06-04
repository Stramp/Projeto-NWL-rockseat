import express from 'express';
import ControllersPonto from './database/controls/controllersPonto';

const rotas = express.Router();
const controlPonto = new ControllersPonto();

rotas.post('/ponto-de-coleta', controlPonto.create);
rotas.get('/ponto-de-coleta/:id', controlPonto.show);
rotas.get('/ponto-de-coleta/', controlPonto.index);

export default rotas;