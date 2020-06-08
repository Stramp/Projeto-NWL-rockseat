import React, { useEffect } from 'react';
import './styles.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FiCheckCircle } from 'react-icons/fi'



export default function TransitionsModal(props: any) {

    const l = props.load;
    const [load, setLoad] = React.useState(true);
    console.log('props2>', l);



    useEffect(() => {
        setLoad(l);
    }, [l])


    return (
        <div className='container' >
            <div className="modal-group">

                {load ? <CircularProgress id="spinner" /> : <FiCheckCircle id="doneCadastro" color="#34CB79" size="40" />}
                {load ? <h2>Cadastrando</h2> : <h2>Cadastrado</h2>}
            </div>


        </div >
    );
}
