import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import ResultadosPontos from './pages/Resultados';

const Router = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={CreatePoint} path="/cadastra-ponto" />
            <Route component={ResultadosPontos} path="/lista-pontos" />
        </BrowserRouter>
    );
}

export default Router;