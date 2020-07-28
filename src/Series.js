import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Series = () => {
    const [data, setData] = useState([]);
    const HeaderSeries = () => {
        return (
            <div className='card'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h1 className='main-title'>Séries</h1>
                        <Link to='/series/novo' className='btn btn-info'><i className="fa fa-plus" aria-hidden="true"></i> Cadastrar</Link>
                    </div>
                </div>
            </div>
        )
    }

    const deletarSerie = (id) => {
        const confirmDelete = () => window.confirm('Deseja realmente excluir esta Série?');

        if (confirmDelete()) {
            axios
                .delete(`/api/series/${id}`)
                .then(() => {
                    const dataFiltered = data.filter(item => item.id !== id);
                    setData(dataFiltered);
                    alert('Série deletada com sucesso! /o/');
                })
                .catch();
        }
        return;
    }

    const tableRowData = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                    {item.status === 'assistido' && <span className='badge p-1 badge-success'>Sim</span>}
                    {item.status === 'naoAssistido' && <span className='p-1 badge badge-danger'>Não</span>}
                </td>
                <td>{item.genre}</td>
                <td>
                    <Link to={`/series/${item.id}`} className="btn btn-warning py-2 px-3 mr-2">
                        <i className="fa fa-pencil" aria-hidden="true"></i> Editar
                    </Link>
                    <button onClick={() => deletarSerie(item.id)} className="btn btn-danger py-2 px-3">
                        <i className="fa fa-trash" aria-hidden="true"></i> Excluir
                    </button>
                </td>
            </tr>
        )
    }

    useEffect(() => {
        axios
            .get('/api/series')
            .then(res => {
                // adiciona os resultados retornados da api a variavel data
                setData(res.data.data);
            });
    }, []);

    if (data.length === 0) {
        return (
            <React.Fragment>
                <HeaderSeries />
                <div className='card mt-4 main-content'>
                    <div className='card-body'>
                        <p className='alert alert-warning'>Nenhuma <strong>Série</strong> encontrada!</p>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <HeaderSeries />
            <div className='card main-content'>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='table-responsive'>
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th scope='col'>#</th>
                                            <th scope='col'>Descrição</th>
                                            <th scope='col'>Já Assistiu</th>
                                            <th scope='col'>Gênero</th>
                                            <th scope='col'>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map(tableRowData)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Series;