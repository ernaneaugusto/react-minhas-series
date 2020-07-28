import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Series = () => {
    const [data, setData] = useState([]);
    const HeaderSeries = () => {
        return (
            <div className='d-flex justify-content-between mb-4'>
                <h1>Séries</h1>
                <Link to='/series/novo' className='btn btn-info'><i className="fa fa-plus" aria-hidden="true"></i> Cadastrar</Link>
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
                <p className='alert alert-warning'>Nenhuma <strong>Série</strong> encontrado!</p>
            </React.Fragment>
        )
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <HeaderSeries />
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>Descrição</th>
                            <th scope='col'>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(tableRowData)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Series;