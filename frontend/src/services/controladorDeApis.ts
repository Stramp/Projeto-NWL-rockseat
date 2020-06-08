import api from './api';
import axios from 'axios';

const teste = () => {
    return 5 + 5;
};

interface Item {
    itens: [],
}

export interface Ibge {
    sigla: string,
    nome: string

}

const indexItens = async () => {

    const listaObj = await api.get('itens');
    const lista = listaObj.data.itens;
    return lista;

}

const ufs = async () => {
    const ufs = await axios.get<Array<Ibge>>('http://servicodados.ibge.gov.br/api/v1/localidades/estados');
    return ufs.data;
}

const municipios = async (ufSelect: string) => {
    const municipiosPromi = axios.get<Array<Ibge>>('http://servicodados.ibge.gov.br/api/v1/localidades/estados/' + ufSelect + '/municipios')
    const municipios = (await municipiosPromi).data.map(item => (
        item.nome
    ));


    return municipios;
}
const coords = async (ufSelect: string, endereco: string, city: string) => {
    const data = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${endereco},${city}-${ufSelect}&key=20a9c85cb9494bfdac7a9234792698e8`);
    const coords = data.data.results[0].geometry

    return coords;
}

export default {
    indexItens,
    ufs,
    municipios,
    coords,

}
