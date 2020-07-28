import React from 'react';

const Home = () => {
    return (
        <main>
            <div className='card'>
                <div className='card-body'>
                    <h1 className='main-title'>Home</h1>
                </div>
            </div>

            <div className='card mt-4 main-content'>
                <div className='card-body'>
                    <div className='row min-vh-60'>
                        <div className='col-12'>
                            <p className='card-text'>Aplicação para gerenciamento de séries.</p>
                            <p className='card-text'>Selecione uma das opções no menu para começar!</p>
                        </div>
                        <div className='col-12 align-self-end text-center'>
                            <p className='card-text'>Desenvolvido por <strong>Ernane Toledo</strong></p>
                            <ul className='list-unstyled'>
                                <li className='social-icons blue'>
                                    <a href='https://www.linkedin.com/in/ernanetoledo/' title='Acesse meu Linkedin' target='_blank'>
                                        <i className='fa fa-linkedin' aria-hidden='true'></i>
                                    </a>
                                </li>
                                <li className='social-icons black'>
                                    <a href='https://github.com/ernaneaugusto/react-minhas-series' title='Acesse o repositório do projeto' target='_blank'>
                                        <i className='fa fa-github' aria-hidden='true'></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;