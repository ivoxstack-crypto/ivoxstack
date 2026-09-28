import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { store } from './lib/store';
import './index.css';

// Load live content and restore any staff session in the background
void store.init();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
