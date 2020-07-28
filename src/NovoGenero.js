import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const NovoGenero = () => {
    const [name, setName] = useState('');
    const [errorForm, setErrorForm] = useState(null);
    const [successForm, setSuccessForm] = useState(null);

    const onChangeForm = (event) => {
        setName(event.target.value);
    }
    const onSubmitForm = () => {
        if (name === '' || name === null) {
            alert('Campo Nome do gênero é obrigatório!');
            return;
        }

        axios
            .post('/api/genres', { name })
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

    if (successForm) {
        return <Redirect to='/generos' />
    }

    return (
        <div className='card main-content'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col'>
                        <h1 className='main-title mb-3'>Novo gênero</h1>
                        <Link to='/generos' className='text-primary'><i className="fa fa-chevron-left" aria-hidden="true"></i> Voltar</Link>

                        <form className='form-row my-4'>
                            <div className='col-lg-6'>
                                <label htmlFor='name'><strong>Nome do gênero</strong></label>
                                <input type='text' value={name} onChange={onChangeForm} id='name' className='form-control' placeholder='Aventura, Comédia, Suspense...' />
                                <button className='btn btn-info my-4 mx-0' onClick={onSubmitForm} type='button'><i className="fa fa-check" aria-hidden="true"></i>  Salvar</button>
                                {errorForm && <p className='alert alert-danger'>Erro ao cadastrar os dados! :(</p>}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NovoGenero;