import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import ContextPesquisa from './contexts/contextPesquisaEndereco';
import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import ResultadosPontos from './pages/Resultados';

const Router = () => {
    return (
        <ContextPesquisa>
            <BrowserRouter>
                <Route component={Home} path="/" exact />
                <Route component={CreatePoint} path="/cadastra-ponto" />
                <Route component={ResultadosPontos} path="/lista-pontos" />
            </BrowserRouter>
        </ContextPesquisa>
    );
}

export default Router;