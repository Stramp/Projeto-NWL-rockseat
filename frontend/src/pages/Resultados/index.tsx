import React, { useEffect, ChangeEvent, FormEvent, useState } from 'react';
import './styles.css';
import { usePesquisaContext } from '../../contexts/contextPesquisaEndereco';

import { FiArrowLeft } from 'react-icons/fi';
import apiControl, { IIbge, IPontosBd } from '../../services/controladorDeApis';
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.svg';

export default function () {
    const { cidade, setCidade, cidades, setCidades, uf, setUf, ufs, setUfs, pontos, setPontos } = usePesquisaContext();
    const [load, setLoad] = useState(false);

    useEffect(() => {

        (async () => {
            const ufs = await apiControl.ufs();
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

        setLoad(true);
        const buscador = await apiControl.pontosFiltrados(cidade, uf);
        console.log(">>>>", buscador, "<<<<<<");
        setLoad(false);

        setPontos(buscador);

    }



    console.log(load, "<<load?")

    return (
        <div id="page-results" >
            <header>
                <img src={logo} alt="Ecoleta" />
                <form onSubmit={handSubmit}>
                    <fieldset>
                        <div className="field-group">

                            <select onChange={handUf} name="uf" id="uf">
                                <option value="0">UF</option>
                                {ufs.map((item: IIbge, i: number) => (<option key={i} value={item.sigla}>{item.sigla}</option>))}
                            </select>


                            <select onChange={handCity} name="city" id="city">
                                <option value="0">Cidade</option>
                                {cidades.map((item: string, i: number) => (<option key={i} value={item}>{item}</option>))}
                            </select>

                            <button type="submit">Buscar</button>
                        </div>

                    </fieldset>

                </form>
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>

            <main>
                <h4>{load ? "Carregando" :
                    <>
                        <strong>
                            {pontos.length}
                        </strong> resultados encontrados
                    </>
                }
                </h4>

                <div className="cards">
                    {pontos.map((ponto: IPontosBd, i: number) => {
                        return (
                            <div key={i} className="card">

                                <img src={ponto.img} alt="nomedolocal" />
                                <h2>{ponto.nome}</h2>

                                <h3>{ponto.items.map(item => item.nome + " | ")}</h3>
                                <p>
                                    {ponto.cidade},  {ponto.uf} <br />
                                    {ponto.rua.replace(/%20/g, ' ')}
                                </p>
                            </div>
                        )
                    })}


                </div>

            </main>
        </div>
    );
}