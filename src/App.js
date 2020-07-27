import React from 'react';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand navbar-dark primary-color">
        <a className="navbar-brand" href="#">Minhas Séries</a>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Séries</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default App;
