import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import './App.css';

import Header from './Header';
import Home from './Home';
import Generos from './Generos';
import NovoGenero from './NovoGenero';
import EditarGenero from './EditarGenero';
import Series from './Series';

function App() {
  const [data, setData] = useState({});

  return (
    <Router>
      <Header />
      <div className='container my-4'>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/series' exact component={Series} />
          <Route path='/generos' exact component={Generos} />
          <Route path='/generos/novo' exact component={NovoGenero} />
          <Route path='/generos/:id' exact component={EditarGenero} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
