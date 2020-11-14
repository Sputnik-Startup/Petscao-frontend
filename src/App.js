import React from 'react';
import Routes from './routes';

import { Global } from './global/globals';

import { ToastProvider } from './context/ToastContext';
import { ModalWrap } from './components/Modal';

import './ReactotronConfig';

function App() {
  return (
    <ToastProvider>
      <Global />
      <ModalWrap>
        <Routes />
      </ModalWrap>
    </ToastProvider>
  );
}

export default App;
