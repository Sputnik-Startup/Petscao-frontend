import React, { useContext, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import {
  FiHome,
  FiCalendar,
  FiShoppingCart,
  FiUsers,
  FiUser,
  FiMail,
  FiSettings,
} from 'react-icons/fi';

import { Container } from './styles';

import logo from '../../assets/logo.svg';
import { useHistory } from 'react-router-dom';

import Pawn from '../../assets/Pawn.svg';
import { UserContext } from '../../context/AuthContext';

function DashboardAside() {
  const [show, setShow] = useState(false);
  const history = useHistory();

  const { user } = useContext(UserContext);

  return (
    <Container
      show={show}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <li className="logo">
        <img src={logo} alt="logo" />
        <FaChevronRight size={22} color="#757575" />
      </li>

      <li
        onClick={() => history.push('/dashboard')}
        className={
          history.location.pathname === '/dashboard' ? 'selected' : null
        }
      >
        <FiHome size={22} color="#8254ff" />
        <span>Dashboard</span>
      </li>

      <li
        onClick={() => history.push('/dashboard/appointments')}
        className={
          history.location.pathname === '/dashboard/appointments'
            ? 'selected'
            : null
        }
      >
        <FiCalendar size={22} color="#38d7ff" />
        <span>Agendamentos</span>
      </li>

      <li
        onClick={() => history.push('/dashboard/purchases')}
        className={
          history.location.pathname === '/dashboard/purchases'
            ? 'selected'
            : null
        }
      >
        <FiShoppingCart size={22} color="#6bc97e" />
        <span>Compras</span>
      </li>

      <li
        onClick={() => history.push('/dashboard/customers')}
        className={
          history.location.pathname === '/dashboard/customers'
            ? 'selected'
            : null
        }
      >
        <FiUsers size={22} color="#f1b71c" />
        <span>Clientes</span>
      </li>

      <li
        onClick={() => history.push('/dashboard/pets')}
        className={
          history.location.pathname === '/dashboard/pets' ? 'selected' : null
        }
      >
        <img src={Pawn} alt="pawn" />
        <span>Pets</span>
      </li>
      {user?.access === 'adm' && (
        <li
          onClick={() => history.push('/dashboard/employees')}
          className={
            history.location.pathname === '/dashboard/employees'
              ? 'selected'
              : null
          }
        >
          <FiUser size={22} color="#b06e35" />
          <span>Funcionários</span>
        </li>
      )}

      <li
        onClick={() => history.push('/dashboard/posts')}
        className={
          history.location.pathname === '/dashboard/posts' ? 'selected' : null
        }
      >
        <FiMail size={22} color="#333" />
        <span>Publicaçoes</span>
      </li>

      <li
        onClick={() => history.push('/dashboard/tools')}
        className={
          history.location.pathname === '/dashboard/tools' ? 'selected' : null
        }
      >
        <FiSettings size={22} color="#969696" />
        <span>Ferramentas</span>
      </li>
    </Container>
  );
}

export default DashboardAside;
