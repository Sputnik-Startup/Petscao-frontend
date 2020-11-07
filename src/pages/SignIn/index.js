import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

import '../../App.css';
import './main.css';

import logo from '../../assets/logo.svg';
import { ModalContext } from '../../context/ModalContext';

function Signin({ history }) {
  const { showToast } = useContext(ModalContext);

  return (
    <div id="container">
      <form action="">
        <img src={logo} alt="logo" />
        <p>Bem vindo ao sistema Pet’scão</p>
        <div className="form-input">
          <FiMail color="#172B4D" size={22} style={{ width: '10%' }} />
          <input type="text" placeholder="Usuário" />
        </div>
        <div className="form-input">
          <FiLock color="#172B4D" size={22} style={{ width: '10%' }} />
          <input type="password" placeholder="Senha" />
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            showToast('Essa ação não é permitida!');
          }}
        >
          Entrar
        </button>
      </form>
      <Link to="#" onClick={() => history.push()}>
        Esqueceu sua senha? Solicite aqui.
      </Link>
    </div>
  );
}

export default Signin;
