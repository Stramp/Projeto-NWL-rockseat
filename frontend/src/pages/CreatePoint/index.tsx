import React, { useEffect, useState, ChangeEvent } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import axios from 'axios';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

interface Item {
    item: String,
    id: number,
    img: String
}

interface Ibge {
    sigla: string,
    nome: string

}

const CreatePoint = () => {
    const [itens, setItens] = useState([]);
    const [ufs, setUfs] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [ufSelect, setUfSelect] = useState('');
    useEffect(() => {
        console.log('eae')
        api.get('itens').then(resp => {
            setItens(resp.data.itens);
        })
        axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/estados').then(resp => {
            const uf = resp.data.map((item: Ibge) => (
                item.sigla
            ));
            setUfs(uf);
        });
    }, []);

    useEffect(() => {
        axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/estados/' + ufSelect + '/municipios').then(resp => {
            const cities = resp.data.map((item: Ibge) => (
                item.nome
            ));
            setCities(cities);
        });
    }, [ufSelect]);

    function handUf(e: ChangeEvent<HTMLSelectElement>) {
        setUfSelect(e.target.value);
    }
    function handCity(e: ChangeEvent<HTMLSelectElement>) {
        setCity(e.target.value);
    }
    const state = {
        lat: 51.505,
        lng: -0.09,
        zoom: 13,
    }
    const position: [number, number] = [state.lat, state.lng];

    return (
        <div id="page-create-point" >
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form action="">
                <h1>Cadastro do <br />Ponto de Coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da Entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name" />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email" />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp" />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereços</h2>
                        <span>Selecione seu endereço no mapa</span>
                    </legend>

                    <Map center={position} zoom={state.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[state.lat, state.lng]}>
                        </Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Endereço</label>
                            <select onChange={handUf} name="uf" id="uf">
                                <option value="0">Selecione o Estado</option>
                                {ufs.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select onChange={handCity} name="city" id="city">
                                <option value="0">Selecione a Cidade</option>
                                {cities.map((item, i) => (<option key={i} value={item}>{item}</option>))}
                            </select>
                        </div>
                    </div>

                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Items de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {
                            itens.map((item: Item) => (

                                < li key={item.id} >
                                    <img src={"http://localhost:3666/uploads/" + item.img} alt="" />
                                    <span>{item.item}</span>
                                </li>
                            ))

                        }



                        <button type="submit">Cadastrar Ponto de Coleta</button>

                    </ul>
                </fieldset>
            </form>
        </div >
    );
}
export default CreatePoint;

