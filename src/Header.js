import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='navbar navbar-expand navbar-dark primary-color'>
            <Link className='navbar-brand text-white' to='/'>Minhas Séries</Link>
            <ul className='navbar-nav'>
                <li className='nav-item active'>
                    <Link className='nav-link' to='/'>Home <span className='sr-only'>(current)</span></Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' to='/generos'>Gêneros</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header;