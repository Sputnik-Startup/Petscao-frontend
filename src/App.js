import React from 'react';
import Routes from './routes';

import { Global } from './global/globals';
import { ModalWrap } from './components/Modal';

import './ReactotronConfig';
import { ProviderBind } from './utils/ProviderBind';

function App() {
  return (
    <ProviderBind>
      <Global />
      <ModalWrap>
        <Routes />
      </ModalWrap>
    </ProviderBind>
  );
}

export default App;
