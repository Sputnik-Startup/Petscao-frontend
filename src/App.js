import React from 'react';
import Routes from './routes';

import { Global } from './global/globals';

import { ToastProvider } from './context/ToastContext';
import { ModalWrap } from './components/Modal';

import './ReactotronConfig';
import { UserProvider } from './context/AuthContext';

function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <Global />
        <ModalWrap>
          <Routes />
        </ModalWrap>
      </UserProvider>
    </ToastProvider>
  );
}

export default App;
