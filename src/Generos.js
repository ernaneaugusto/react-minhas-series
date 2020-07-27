import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Generos = () => {
    const [data, setData] = useState([]);
    const HeaderGenero = () => {
        return (
            <div className='d-flex justify-content-between mb-4'>
                <h1>Gêneros</h1>
                <Link to='/generos/novo' className='btn btn-info'><i className="fa fa-plus" aria-hidden="true"></i> Cadastrar</Link>
            </div>
        )
    }

    const deletarGenero = (id) => {
        const confirmDelete = () => window.confirm('Deseja realmente excluir este Gênero?');

        if (confirmDelete()) {
            axios
                .delete(`/api/genres/${id}`)
                .then(() => {
                    const dataFiltered = data.filter(item => item.id !== id);
                    setData(dataFiltered);
                    alert('Gênero deletado com sucesso! /o/');
                })
                .catch((error) => alert('Ocorreu um erro ao deletar o Gênero! :('))
        }
        return;
    }

    const tableRowData = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                    <Link to={`/generos/${item.id}`} className="btn btn-warning py-2 px-3 mr-2">
                        <i className="fa fa-pencil" aria-hidden="true"></i> Editar
                    </Link>
                    <button onClick={() => deletarGenero(item.id)} className="btn btn-danger py-2 px-3">
                        <i className="fa fa-trash" aria-hidden="true"></i> Excluir
                    </button>
                </td>
            </tr>
        )
    }

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                // adiciona os resultados retornados da api a variavel data
                setData(res.data.data);
            });
    }, []);


    if (data.length === 0) {
        return (
            <React.Fragment>
                <HeaderGenero />
                <p className='alert alert-warning'>Nenhum <strong>Gênero</strong> encontrado!</p>
            </React.Fragment>
        )
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <HeaderGenero />

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

export default Generos;