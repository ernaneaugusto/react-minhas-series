import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Generos = () => {
    const [data, setData] = useState([]);
    const HeaderGenero = () => {
        return (
            <div className='d-flex justify-content-between mb-4'>
                <h1>Gêneros</h1>
                <Link to='/generos/novo' className='btn btn-info'>+ Cadastrar</Link>
            </div>
        )
    }

    const tableRowData = (item, index) => {
        return (
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                    <a className="text-primary mr-2">Editar</a>
                    <a className="text-primary ">Excluir</a>
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