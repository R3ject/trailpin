// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css';

// Create a custom MUI theme.
const theme = createTheme({
  palette: {
    primary: { main: '#007bff' },
    secondary: { main: '#ff416c' }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif'
  }
});

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

// Register the custom service worker.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered: ', registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed: ', error);
      });
  });
}
