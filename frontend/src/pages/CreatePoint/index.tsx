import React, { useEffect, useState, ChangeEvent } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import axios from 'axios';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

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
    const [ufs, setUfs] = useState<Array<Ibge>>([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [ufSelect, setUfSelect] = useState('');
    const [endereco, setEndereco] = useState('');
    const [markerPos, setMarkerPos] = useState<[number, number]>([0, 0]);
    const [initialPos, setInitialPos] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        console.log('eae')
        api.get('itens').then(resp => {
            setItens(resp.data.itens);
        });
        (async function () {
            const ufs = await axios.get<Array<Ibge>>('http://servicodados.ibge.gov.br/api/v1/localidades/estados');
            setUfs(ufs.data);
        })()

    }, []);

    useEffect(() => {
        if (ufSelect === '') return;
        axios.get('http://servicodados.ibge.gov.br/api/v1/localidades/estados/' + ufSelect + '/municipios').then(resp => {
            const cities = resp.data.map((item: Ibge) => (
                item.nome
            ));
            setCities(cities);
        });
    }, [ufSelect]);

    useEffect(() => {
        if (city === '' && endereco === '' && ufSelect === '') return;
        console.log('ta entrando2');
        (async function () {
            const markerEnd = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${endereco},${city}-${ufSelect}&key=20a9c85cb9494bfdac7a9234792698e8`);
            const { lat, lng } = markerEnd.data.results[0].geometry
            setMarkerPos([lat, lng]);
            setInitialPos([lat, lng]);
        })()
    }, [city, endereco, ufSelect]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            setInitialPos([latitude, longitude]);
        });
    }, []);

    function handUf(e: ChangeEvent<HTMLSelectElement>) {
        setUfSelect(e.target.value);
    }
    function handCity(e: ChangeEvent<HTMLSelectElement>) {
        setCity(e.target.value);
    }
    function handEndereco(e: ChangeEvent<HTMLInputElement>) {
        const end = String(e.target.value).replace(/ /g, '%20');
        console.log(end);
        setEndereco(end);
    }
    function handMap(e: LeafletMouseEvent) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
    }


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

                    <Map center={initialPos} zoom={15} onClick={handMap}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={markerPos}>
                        </Marker>
                    </Map>

                    <div className="field">
                        <label htmlFor="endereco">Endereço</label>
                        <input
                            type="text"
                            name="endereco"
                            id="endereco"
                            onChange={handEndereco} />

                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado</label>
                            <select onChange={handUf} name="uf" id="uf">
                                <option value="0">Selecione o Estado</option>
                                {ufs.map((item, i) => (<option key={i} value={item.sigla}>{item.sigla}</option>))}
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

