import React, { useState } from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiCalendar, FiEdit, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import DateInput from '../../components/DateInput';
import CustomerPicker from '../../components/CustomerPicker';
import PetPicker from '../../components/PetPicker';

function Appointment() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);
  const [createAppointmentModal, setCreateAppointmentModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedPet, setSelectedPet] = useState({});

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
            <button onClick={() => setCreateAppointmentModal(true)}>
              Criar Agendamento
            </button>
          </div>
          <label>
            <span className="medium">cliente</span>
            <span className="medium">pet</span>
            <span className="big">data/hora</span>
            <span className="small"></span>
          </label>
          <ul>
            <li>
              <span className="medium">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="big">22/12/2020 às 14:00h</span>
              <span className="small">
                <FiEdit
                  size={22}
                  color="#039cd8"
                  title="Editar"
                  onClick={() => setEditModal(true)}
                />
                <FiTrash
                  size={22}
                  color="#f55c4e"
                  title="Deletar"
                  onClick={() => setDeleteModal(true)}
                />
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
          <div className="card" style={{ backgroundColor: '#f76457' }}>
            <div className="circle" style={{ border: '5px solid #ff8075' }}>
              233
            </div>
            <span>Agendamentos Cancelados</span>
          </div>
          <div className="card" style={{ backgroundColor: '#498bfc' }}>
            <div className="circle" style={{ border: '5px solid #7dabfa' }}>
              3526
            </div>
            <span>Total de agendamentos</span>
          </div>
        </div>
      </div>
      {deleteModal && (
        <div className="delete-modal">
          <div className="modal-window">
            <h3>Tem certeza?</h3>
            <div className="options" style={{ display: 'flex' }}>
              <button className="yes">Sim</button>
              <button className="no" onClick={() => setDeleteModal(false)}>
                Não
              </button>
            </div>
          </div>
        </div>
      )}
      {editModal && (
        <div className="edit-modal">
          <div className="modal-window w-500">
            <form>
              <label>Selecione uma data</label>
              <DateInput setDate={setUpdateDate} date={updateDate} />

              <div className="row">
                <button className="yes">Salvar</button>
                <button className="blue" onClick={() => setEditModal(false)}>
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {createAppointmentModal && (
        <div className="create-modal">
          <div className="modal">
            <CustomerPicker
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
            />
            <PetPicker
              hasCustomer={!!selectedCustomer.name}
              selectedPet={selectedPet}
              setSelectedPet={setSelectedPet}
            />
            <DateInput setDate={setUpdateDate} date={updateDate} />

            <div className="row">
              <button className="yes">Salvar</button>
              <button
                className="blue"
                onClick={() => setCreateAppointmentModal(false)}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Appointment;
