import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NovaSerie = () => {
    const [name, setName] = useState('');
    const [errorForm, setErrorForm] = useState(null);
    const [successForm, setSuccessForm] = useState(null);

    const onChangeForm = (event) => {
        setName(event.target.value);
    }
    const onSubmitForm = () => {
        if (name === '' || name === null) {
            alert('Campo Nome da série é obrigatório!');
            return;
        }

        axios
            .post('/api/series', { name })
            .then(() => {
                setSuccessForm(true);
                setErrorForm(false);
                setName('');
            })
            .catch(error => {
                setErrorForm(true);
                setSuccessForm(false);
            });
    }

    return (
        <div className='row'>
            <div className='col'>
                <h1>Nova série</h1>
                <Link to='/series' className='text-primary'><i className="fa fa-chevron-left" aria-hidden="true"></i> Voltar</Link>

                <form className='form-row my-4'>
                    <div className='col-lg-6'>
                        <label htmlFor='name'><strong>Nome da série</strong></label>
                        <input type='text' value={name} onChange={onChangeForm} id='name' className='form-control' placeholder='Aventura, Comédia, Suspense...' />
                        <button className='btn btn-info my-4' onClick={onSubmitForm} type='button'><i className="fa fa-check" aria-hidden="true"></i>  Salvar</button>
                        {successForm && <p className='alert alert-success'>Dados cadastrados com sucesso! /o/</p>}
                        {errorForm && <p className='alert alert-danger'>Erro ao cadastrar os dados! :(</p>}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default NovaSerie;