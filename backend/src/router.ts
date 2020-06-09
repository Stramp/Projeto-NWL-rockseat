import express from 'express';
import ControllersPonto from './database/controls/ControllersPonto';
import ControllersItens from './database/controls/ControllersItens';
import multer from 'multer';
import multerConfig from '../src/config/multer'

const rotas = express.Router();

const upLoad = multer(multerConfig);

const controlPonto = new ControllersPonto();
const controlItens = new ControllersItens();

rotas.post('/ponto-de-coleta', upLoad.single('img'), controlPonto.create);

rotas.get('/ponto-de-coleta/:id', controlPonto.show);
rotas.get('/ponto-de-coleta/', controlPonto.index);
rotas.get('/todos-pontos/', controlPonto.allIndex);
rotas.get('/itens', controlItens.index);

export default rotas;