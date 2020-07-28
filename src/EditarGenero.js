import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const EditarGenero = (props) => {
    const idGenero = props.match.params.id;
    const [name, setName] = useState('');
    const [errorGetGenre, setErrorGetGenre] = useState(false);
    const [successForm, setSuccessForm] = useState(null);
    const [errorForm, setErrorForm] = useState(null);

    useEffect(() => {
        axios.get(`/api/genres/${idGenero}`)
            .then(res => setName(res.data.name))
            .catch(error => {
                setErrorGetGenre(true);
            });
    }, [idGenero]);

    const onChangeForm = (event) => {
        setName(event.target.value);
    }
    const onSubmitForm = () => {
        if (name === '' || name === null) {
            alert('Campo gênero é obrigatório!');
            return;
        }

        axios
            .put(`/api/genres/${idGenero}`, { name })
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
        <div className='row'>
            <div className='col'>
                <h1>Editar gênero</h1>
                <Link to='/generos' className='text-primary'><i className="fa fa-chevron-left" aria-hidden="true"></i> Voltar</Link>

                {!errorGetGenre && <form className='form-row my-4'>
                    <div className='col-lg-6'>
                        <label htmlFor='name'><strong>Nome do gênero</strong></label>
                        <input type='text' value={name} onChange={onChangeForm} id='name' className='form-control' placeholder='Aventura, Comédia, Suspense...' />
                        <button className='btn btn-info my-4' onClick={onSubmitForm} type='button'><i className="fa fa-check" aria-hidden="true"></i>  Salvar</button>
                        {errorForm && <p className='alert alert-danger'>Erro ao cadastrar os dados! :(</p>}
                    </div>
                </form>}
                {errorGetGenre && <p className='alert alert-danger mt-3'>Erro ao buscar as informações do Gênero! :(</p>}
            </div>
        </div>
    )
}

export default EditarGenero;