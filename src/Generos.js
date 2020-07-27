import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Generos = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
                setData(res.data.data);
            });
    }, []);

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

    if (data.length === 0) {
        return (
            <p className='alert alert-warning'>Nenhum <strong>Gênero</strong> encontrado!</p>
        )
    }

    return (
        <div className='row'>
            <div className='col-12'>
                <h1>Gêneros</h1>

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