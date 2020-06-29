import React, { createContext, useState, useContext } from 'react'
import { IIbge, IPontosBd } from '../services/controladorDeApis';

interface IPesquisaContext {
    cidade: string,
    setCidade: Function,
    cidades: string[],
    setCidades: Function,
    uf: string,
    setUf: Function,
    ufs: IIbge[],
    setUfs: Function,
    pontos: IPontosBd[],
    setPontos: Function
}

const PesquisaContext = createContext({} as IPesquisaContext);


const ContextProvider: React.FC = ({ children }) => {
    const [cidade, setCidade] = useState('');
    const [cidades, setCidades] = useState([]);
    const [uf, setUf] = useState('');
    const [ufs, setUfs] = useState([]);
    const [pontos, setPontos] = useState([]);


    return (
        <PesquisaContext.Provider value={
            {
                cidade, setCidade,
                cidades, setCidades,
                uf, setUf,
                ufs, setUfs,
                pontos, setPontos
            }
        }>
            {children}
        </PesquisaContext.Provider>
    )
}

export default ContextProvider;

export function usePesquisaContext() {
    const context = useContext(PesquisaContext);
    return context;
}