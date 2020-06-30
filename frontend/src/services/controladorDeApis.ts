import api from './api';
import axios from 'axios';


interface Item {
    itens: [],
}

export interface IIbge {
    sigla: string,
    nome: string

}

export interface IPontosBd {
    nome: string,
    img: string,
    email: string,
    whatsapp: string,
    numero: string,
    cidade: string,
    uf: string,
    rua: string,
    id: number,
    items: {
        nome: string,
        urlImg: string
    }[]
}

const indexItens = async () => {

    const listaObj = await api.get('itens');
    const lista = listaObj.data;
    return lista;

}

const ufs = async () => {
    const ufs = await axios.get<Array<IIbge>>('http://servicodados.ibge.gov.br/api/v1/localidades/estados');
    return ufs.data;
}

const municipios = async (ufSelect: string) => {
    const municipiosPromi = axios.get<Array<IIbge>>('http://servicodados.ibge.gov.br/api/v1/localidades/estados/' + ufSelect + '/municipios')
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

const pontosFiltrados = async (cidade: string, uf: string) => {
    console.log("???????", cidade, uf)
    const pontosEncontrados = await api.get(`ponto-de-coleta?cidade=${cidade}&uf=${uf}`);
    console.log("???>>>>????", pontosEncontrados)
    return pontosEncontrados.data.pontos;
}

export default {
    indexItens,
    ufs,
    municipios,
    coords,
    pontosFiltrados

}
