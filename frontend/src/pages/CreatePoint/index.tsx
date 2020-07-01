import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import apiControl from '../../services/controladorDeApis';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import CadastroConcluido from '../../components/modals/CadastroConcluido';
import DropZone from '../../components/DropZone';

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
    const [open, setOpen] = useState<boolean>(false);
    const [load, setLoad] = useState<boolean>(true);
    const [itens, setItens] = useState([]);
    const [itensSelect, setItensSelect] = useState<number[]>([]);
    const [ufs, setUfs] = useState<Array<Ibge>>([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [ufSelect, setUfSelect] = useState('');
    const [endereco, setEndereco] = useState('');
    const [markerPos, setMarkerPos] = useState<[number, number]>([0, 0]);
    const [initialPos, setInitialPos] = useState<[number, number]>([0, 0]);
    const [imgLoaded, setImgLoaded] = useState<File>()
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        whatsapp: ''
    });

    const hist = useHistory();

    useEffect(() => {
        (async function () {
            const items = await apiControl.indexItens();
            setItens(items);

            const ufs = await apiControl.ufs();
            setUfs(ufs);
        })();

        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            setInitialPos([latitude, longitude]);
        });

    }, []);

    useEffect(() => {
        if (ufSelect === '') return;
        (async function () {
            const cities: any = await apiControl.municipios(ufSelect);
            setCities(cities);
        })();
    }, [ufSelect]);

    useEffect(() => {
        if (city === '' && endereco === '' && ufSelect === '') return;
        (async function () {
            const { lat, lng } = await apiControl.coords(ufSelect, endereco, city);
            setMarkerPos([lat, lng]);
            setInitialPos([lat, lng]);
        })()
    }, [city, endereco, ufSelect]);



    function handUf(e: ChangeEvent<HTMLSelectElement>) {
        setUfSelect(e.target.value);
    }
    function handCity(e: ChangeEvent<HTMLSelectElement>) {
        setCity(e.target.value);
    }
    function handEndereco(e: ChangeEvent<HTMLInputElement>) {
        const end = String(e.target.value).replace(/ /g, '%20');
        setEndereco(end);
    }
    function handMap(e: LeafletMouseEvent) {
        setMarkerPos([e.latlng.lat, e.latlng.lng]);
    }
    function handForm(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    function handSelectItem(id: number) {
        const alreadySelect = itensSelect.findIndex(item => item === id);
        if (alreadySelect >= 0) {
            const filterItens = itensSelect.filter(item => item !== id);
            setItensSelect(filterItens);
        } else {
            setItensSelect([...itensSelect, id]);
        }

    }





    async function handSubimit(e: FormEvent) {
        e.preventDefault();
        const { nome, email, whatsapp } = formData;
        const cidade = city;
        const img = imgLoaded;
        const uf = ufSelect;
        const [lat, lng] = markerPos;
        const itens = itensSelect;
        const rua = endereco;
        const numero = '13';


        const data = new FormData();

        data.append('nome', nome);
        data.append('email', email);
        if (img) data.append('img', img);
        data.append('whatsapp', whatsapp);
        data.append('cidade', cidade);
        data.append('uf', uf);
        data.append('lat', String(lat));
        data.append('lng', String(lng));
        data.append('itens', itens.join(','));
        data.append('numero', numero);
        data.append('rua', rua);


        setOpen(true);

        api.post('ponto-de-coleta', data).then((result) => {
            console.log('cadastrou', result);
            setLoad(false);
            const interval = setInterval(() => {
                hist.push('/');
                clearInterval(interval);
            }, 3000);
        }, (err) => {
            console.warn('erro>', err)
        })

    }





    return (
        <div id="page-create-point" >
            {open ? <CadastroConcluido load={load} /> : <></>}
            <header>
                <img src={logo} alt="Ecoleta" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <form onSubmit={handSubimit}>
                <h1>Cadastro do <br />Ponto de Coleta</h1>
                <DropZone onChangeImg={setImgLoaded} />
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="nome">Nome da Entidade</label>
                        <input
                            type="text"
                            name="nome"
                            id="nome"
                            onChange={handForm} />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handForm} />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handForm} />
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

                                < li
                                    key={item.id}
                                    onClick={() => handSelectItem(item.id)}
                                    className={itensSelect.includes(item.id) ? 'selected' : ''}>
                                    <img src={String(item.img)} alt="" />
                                    <span>{item.item}</span>
                                </li>
                            ))

                        }





                    </ul>
                    <button type="submit">Cadastrar Ponto de Coleta</button>
                </fieldset>
            </form>
        </div >
    );
}
export default CreatePoint;

