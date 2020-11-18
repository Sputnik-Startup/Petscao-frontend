import React, { useEffect, useState } from 'react';
import { FiMail } from 'react-icons/fi';

import { Container } from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';

function Signin() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <form>
        <img src={logo} alt="logo" />
        <p>Bem vindo ao sistema Pet’scão</p>
        <Input
          type="text"
          value={user}
          icon={<FiMail color="#172B4D" size={22} style={{ width: '10%' }} />}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Usuário"
        />
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
        <button
          type="submit"
          disabled={!user || !password || password.length < 6 ? true : false}
        >
          Entrar
        </button>
      </form>
    </Container>
  );
}

export default Signin;
