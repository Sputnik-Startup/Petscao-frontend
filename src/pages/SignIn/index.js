import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';

import '../../App.css';
import './main.css';

import logo from '../../assets/logo.svg'

function Signin({ history }) {
  return (
    <div id="container">
    <form action="">
        <img src={logo} alt="logo"/>
        <p>Bem vindo ao sistema da Pet’scão</p>
        <div className="form-input" >
          <FiMail color="#172B4D" size={22} style={{width: '10%'}}/>
          <input type="text" placeholder="Usuário"/>
        </div>
        <div className="form-input">
          <FiLock color="#172B4D" size={22} style={{width: '10%'}}/>
          <input type="password" placeholder="Senha"/>
        </div>

        <button> <span></span> Entrar</button>
      </form>
    <Link to="#" onClick={()=>history.push()}>Esqueceu sua senha? Solicite aqui.</Link>
  </div>
  );
}

export default Signin;