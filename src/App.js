import React from 'react';
import Routes from './routes';

import { ToastProvider } from './context/ToastContext';
import { ModalWrap } from './components/Modal';

import './global.css';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <ModalWrap>
        <Routes />
      </ModalWrap>
    </ToastProvider>
  );
}

export default App;
