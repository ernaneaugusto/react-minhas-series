import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import './App.css';

import Header from './Header';

const Home = () => <h1>Home</h1>
const Generos = () => <h1>Gêneros</h1>

function App() {
  return (
    <Router>
      <Header />
      <div className='container'>
        <Route path='/' exact component={Home} />
        <Route path='/generos' component={Generos} />
      </div>
    </Router>
  );
}

export default App;
