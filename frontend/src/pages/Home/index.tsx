import React, { useState } from 'react';
import './styles.css';
import logo from '../../assets/logo.svg'
import { FiLogIn, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import BuscarPonto from '../../components/modals/BuscarPonto'


const Home = () => {

    const [open, setOpen] = useState<boolean>(false);

    function handModal() {
        setOpen(true);
    }

    return (
        <div id="page-home">
            {open ? <BuscarPonto /> : <></>}
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta" />
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</p>
                    <button onClick={handModal}>
                        <span>
                            <FiSearch />
                        </span>
                        <strong>Encontrar um ponto de coleta</strong>
                    </button>
                    <Link to="/cadastra-ponto" id="cadastrar">
                        <FiLogIn />Cadastre ponto de coleta
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;