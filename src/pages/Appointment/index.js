import React from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiCalendar, FiEdit, FiSearch, FiTrash, FiUser } from 'react-icons/fi';

import { Container } from './styles';

function Appointment() {
  return (
    <Container>
      <ComponentHeader
        title="Agendamentos"
        icon={<FiCalendar size={25} color="#fff" />}
        style={{ padding: '0 40px' }}
      />
      <div className="content">
        <div className="list">
          <div className="title">
            <h3>Todos os Agendamentos</h3>
            <button>Criar Agendamento</button>
          </div>
          <label>
            <span className="medium">Cliente</span>
            <span className="medium">Pet</span>
            <span className="big">Data/hora</span>
            <span className="small"></span>
          </label>
          <ul>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit size={22} color="#039cd8" title="Editar" />
                <FiTrash size={22} color="#f55c4e" title="Deletar" />
              </span>
            </li>
          </ul>
        </div>
        <div className="cards">
          <div
            className="card-appointments"
            style={{ backgroundColor: '#f76457' }}
          >
            <div className="circle" style={{ border: '5px solid #ff8075' }}>
              233
            </div>
            <span>Agendamentos Cancelados</span>
          </div>
          <div
            className="card-appointments"
            style={{ backgroundColor: '#498bfc' }}
          >
            <div className="circle" style={{ border: '5px solid #7dabfa' }}>
              3526
            </div>
            <span>Total de agendamentos</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Appointment;
