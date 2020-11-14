import React, { useEffect, useState } from 'react';
import { FiMail } from 'react-icons/fi';

import { Container } from './styles';

import logo from '../../assets/logo.svg';
import Input from '../../components/Input';

function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (!email || !password || password.length < 6) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, password]);

  return (
    <Container>
      <form>
        <img src={logo} alt="logo" />
        <p>Bem vindo ao sistema Pet’scão</p>
        <Input
          type="text"
          icon={<FiMail color="#172B4D" size={22} style={{ width: '10%' }} />}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Usuário"
        />
        <Input onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" disabled={disabled}>
          Entrar
        </button>
      </form>
    </Container>
  );
}

export default Signin;
