import React from 'react';
import Routes from './routes';

import { Global } from './global/globals';

import { ToastProvider } from './context/ToastContext';
import { ModalWrap } from './components/Modal';

import './ReactotronConfig';
import { UserProvider } from './context/AuthContext';
import { RealTimeAppointmentProvider } from './context/RealTimeAppointment';

function App() {
  return (
    <ToastProvider>
      <UserProvider>
        <RealTimeAppointmentProvider>
          <Global />
          <ModalWrap>
            <Routes />
          </ModalWrap>
        </RealTimeAppointmentProvider>
      </UserProvider>
    </ToastProvider>
  );
}

export default App;
