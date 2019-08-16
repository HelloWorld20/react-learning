import React from 'react';
import { routeList } from './route';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <ul>
          {
            Object.keys(routeList).map(key => {
              return (
                <li key={key}>
                  <a className='App-link' href={`/#/${key}`}>{key}</a>
                </li>
              )
            })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
