import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const EditarSerie = (props) => {
    const idSerie = props.match.params.id;
    const [formData, setFormData] = useState({name: ''});
    const [errorGetSerie, setErrorGetSerie] = useState(false);
    const [successForm, setSuccessForm] = useState(false);
    const [errorForm, setErrorForm] = useState(null);
    const [mode, setMode] = useState('EDIT');
    const [generos, setGeneros] = useState([]);
    const headerInfos = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${formData.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeast: 'no-repeat'
    }

    useEffect(() => {
        axios
            .get(`/api/series/${idSerie}`)
            .then(res => setFormData(res.data))
            .catch(error => {
                setErrorGetSerie(true);
            });
    }, [idSerie]);

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
            alert('Campo série é obrigatório!');
            return;
        }

        axios
            .put(`/api/series/${idSerie}`, formData)
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
        <React.Fragment>
            <header className='mb-4' style={headerInfos}>
                <div style={{ backgroundColor: 'rgba(0,0,0,.7)' }} className='h-100 p-4'>
                    <div className='row h-100 align-items-center'>
                        <div className='col-lg-3'>
                            <img src={formData.poster} alt={formData.name} className='img-fluid img-thumbnail' />
                        </div>
                        <div className='col-lg-9 text-white'>
                            <h1>{formData.name}</h1>
                            <p><strong>Gênero:</strong> {formData.genre}</p>
                            {formData.status === 'assistido' && <p className='badge badge-success'>Assistido</p>}
                            {formData.status === 'naoAssistido' && <p className='badge badge-warning'>Para assistir</p>}
                        </div>
                    </div>
                </div>
            </header>
            <div className='row'>
                <div className='col-12'>
                    {mode === 'INFO' &&
                        <button className='btn btn-info' onClick={() => setMode('EDIT')}>
                            <i className='fa fa-edit'></i> Editar
                    </button>
                    }
                    {mode === 'EDIT' &&
                        <button className='btn btn-warning' onClick={() => setMode('INFO')}>
                            <i className='fa fa-close'></i> Fechar
                    </button>
                    }
                </div>
            </div>
            {mode === 'EDIT' &&
                <div className='row mt-4'>
                    <div className='col'>
                        <h1>Editar série</h1>
                        <Link to='/series' className='text-primary'><i className='fa fa-chevron-left' aria-hidden='true'></i> Voltar</Link>

                        {!errorGetSerie &&
                            <form className='form-row my-4'>
                                <div className='col-lg-6'>
                                    <div className='form-group'>
                                        <label htmlFor='name'><strong>Nome do série</strong></label>
                                        <input type='text' value={formData.name} onChange={onChangeForm('name')} id='name' className='form-control' placeholder='La Casa de Papel, The Walking Dead, Manifest...' />
                                    </div>

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

                                    <div className='form-group'>
                                        <label htmlFor='comments'><strong>Comentários</strong></label>
                                        <textarea type='text' value={formData.comments} onChange={onChangeForm('comments')} id='comments' className='form-control mb-3' placeholder='O que você achou da série...' rows='5'></textarea>
                                    </div>

                                    <div className='form-group'>
                                        <button className='btn btn-info my-4' onClick={onSubmitForm} type='button'><i className='fa fa-check' aria-hidden='true'></i>  Salvar</button>
                                        {errorForm && <p className='alert alert-danger'>Erro ao cadastrar os dados! :(</p>}
                                    </div>
                                </div>
                            </form>}
                        {errorGetSerie && <p className='alert alert-danger mt-3'>Erro ao buscar as informações da Série! :(</p>}
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default EditarSerie;