import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import './App.css';

import Header from './Header';
import Home from './Home';
import Generos from './Generos';
import axios from 'axios';
import NovoGenero from './NovoGenero';
import EditarGenero from './EditarGenero';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get('/api')
      .then(res => {
        setData(res.data);
      });
  }, []);

  return (
    <Router>
      <Header />
      <div className='container my-4'>
        <Route path='/' exact component={Home} />
        <Route path='/generos' exact component={Generos} />
        <Route path='/generos/novo' exact component={NovoGenero} />
        <Route path='/generos/:id' exact component={EditarGenero} />
      </div>
    </Router>
  );
}

export default App;
