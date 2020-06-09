import React, { useEffect, ChangeEvent, FormEvent, Component } from 'react';
import './styles.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FiCheckCircle } from 'react-icons/fi';
import apiControl, { Ibge } from '../../../services/controladorDeApis'
import { useHistory } from 'react-router-dom'

const Formulario = (props: any) => {
    console.count('formulario')
    console.log('formulario', props)
    return (

        <fieldset>
            <legend>
                <h2>Dados</h2>
            </legend>
            <div className="field-group">

                <select onChange={props.handUf} name="uf" id="uf">
                    <option value="0">UF</option>
                    {props.ufs.map((item: Ibge, i: number) => (<option key={i} value={item.sigla}>{item.sigla}</option>))}
                </select>


                <select onChange={props.handCity} name="city" id="city">
                    <option value="0">Cidade</option>
                    {props.cidades.map((item: string, i: number) => (<option key={i} value={item}>{item}</option>))}
                </select>

            </div>
            <button type="submit">Buscar</button>
        </fieldset>


    );
}

export default function TransitionsModal(props: any) {
    const Loader = () => {
        return (
            <div id="loader">
                {load ? <CircularProgress id="spinner" /> : <FiCheckCircle id="doneCadastro" color="#34CB79" size="40" />}
                {load ? <h2>Buscando</h2> : <h2>Encontrado</h2>}
            </div>
        );
    }
    const hist = useHistory();


    const [load, setLoad] = React.useState(true);
    const [open, setOpen] = React.useState(false);
    const [cidade, setCidade] = React.useState('');
    const [cidades, setCidades] = React.useState([]);
    const [uf, setUf] = React.useState('');
    const [ufs, setUfs] = React.useState<Array<Ibge>>([]);

    useEffect(() => {
        (async () => {
            const ufs = await apiControl.ufs();
            console.log("uai", ufs)
            setUfs(ufs);
        })();
    }, [])



    useEffect(() => {
        (async () => {
            const cidades: any = await apiControl.municipios(uf);
            setCidades(cidades);
        })();

    }, [uf])

    function handUf(et: ChangeEvent<HTMLSelectElement>) {
        setUf(et.target.value);
    }
    function handCity(et: ChangeEvent<HTMLSelectElement>) {
        console.log(et.target.value);
        setCidade(et.target.value);
    }
    async function handSubmit(et: FormEvent) {
        et.preventDefault();
        setOpen(true);
        const buscador = await apiControl.pontosFiltrados(cidade, uf);
        console.log('>>>>', buscador);
        console.table(buscador);
        setLoad(false);
        const interval = setInterval(() => {
            hist.push('/lista-pontos');
            clearInterval(interval);
        }, 3000);
    }


    return (
        <div className='formBusca' >
            <div className="modal-group">
                <form onSubmit={handSubmit}>
                    {!open ? <Formulario handUf={handUf} handCity={handCity} ufs={ufs} cidades={cidades} /> : <Loader />}

                </form>
            </div>


        </div >
    );
}
