import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Tabuleiro from './dama/Tabuleiro';
import reportWebVitals from './reportWebVitals';
import { criarTabuleiro } from './dama/NovoTabuleiro/NovaTabela';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Tabuleiro criarTabuleiro={criarTabuleiro}/>
  </React.StrictMode>
);

reportWebVitals();