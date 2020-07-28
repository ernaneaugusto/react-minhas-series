import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const NovaSerie = () => {
    const [formData, setFormData] = useState('');
    const [errorForm, setErrorForm] = useState(null);
    const [successForm, setSuccessForm] = useState(false);
    const [generos, setGeneros] = useState([]);
    const [errorGetSerie, setErrorGetSerie] = useState(false);

    useEffect(() => {
        axios
            .get(`/api/genres`)
            .then(res => setGeneros(res.data.data))
            .catch(error => {
                setErrorGetSerie(true);
            });
    }, []);

    const onChangeForm = fieldName => (event) => {
        setFormData({
            ...formData,
            [fieldName]: event.target.value
        });
    }

    const onSubmitForm = () => {
        if (formData === '' || formData === null) {
            alert('Campo Nome da série é obrigatório!');
            return;
        }

        axios
            .post('/api/series', formData)
            .then(() => {
                setSuccessForm(true);
                setErrorForm(false);
                setFormData('');
            })
            .catch(error => {
                setErrorForm(true);
                setSuccessForm(false);
            });
    }

    if (successForm) {
        return <Redirect to='/series' />
    }

    return (
        <div className='card main-content'>
            <div className='card-body'>
                <div className='row'>
                    <div className='col'>
                        <h1 className='main-title mb-3'>Nova série</h1>
                        <Link to='/series' className='text-primary'><i className="fa fa-chevron-left" aria-hidden="true"></i> Voltar</Link>

                        {!errorGetSerie &&
                            <form className='form-row my-4'>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label htmlFor='name'><strong>Nome do série</strong></label>
                                        <input type='text' value={formData.name} onChange={onChangeForm('name')} id='name' className='form-control' placeholder='La Casa de Papel, The Walking Dead, Manifest...' />
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='comments'><strong>Comentários</strong></label>
                                        <textarea type='text' value={formData.comments} onChange={onChangeForm('comments')} id='comments' className='form-control mb-3' placeholder='O que você achou da série...' rows='5'></textarea>
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label htmlFor='genre'><strong>Gênero</strong></label>
                                        <select value={formData.genre_id} onChange={onChangeForm('genre_id')} id='genre' className='form-control' placeholder='Aventura, Comédia, Suspense...'>
                                            {generos.map(gen => <option key={gen.id} value={gen.id}>{gen.name}</option>)}
                                        </select>
                                    </div>

                                    <div className='form-group'>
                                        <label htmlFor='status'><strong>Você já assistiu: </strong></label>
                                        <br />
                                        <div className='custom-control custom-radio custom-control-inline'>
                                            <input type='radio' onChange={onChangeForm('status')} className='custom-control-input' id='assistido' value='assistido' name='status' checked={formData.status === 'assistido'} />
                                            <label className='custom-control-label' htmlFor='assistido'>Sim</label>
                                        </div>

                                        <div className='custom-control custom-radio custom-control-inline'>
                                            <input type='radio' onChange={onChangeForm('status')} className='custom-control-input' id='naoAssistido' value='naoAssistido' name='status' checked={formData.status === 'naoAssistido'} />
                                            <label className='custom-control-label' htmlFor='naoAssistido'>Não</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='form-group'>
                                        <button className='btn btn-info mx-0' onClick={onSubmitForm} type='button'><i className='fa fa-check' aria-hidden='true'></i>  Salvar</button>
                                        {errorForm && <p className='alert alert-danger'>Erro ao cadastrar os dados! :(</p>}
                                    </div>
                                </div>
                            </form>}
                        {errorGetSerie && <p className='alert alert-danger mt-3'>Erro ao buscar as informações da Série! :(</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NovaSerie;