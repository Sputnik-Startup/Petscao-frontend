import React from 'react';
import Routes from './routes';

import { ModalProvider } from './context/ModalContext';
import { ModalWrap } from './components/Modal';

import './global.css';
import './App.css';

function App() {
  return (
    <ModalProvider>
      <ModalWrap>
        <Routes />
      </ModalWrap>
    </ModalProvider>
  );
}

export default App;
