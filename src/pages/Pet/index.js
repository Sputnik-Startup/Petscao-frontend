import React, { useEffect, useState } from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiCalendar, FiEdit, FiTrash, FiUser } from 'react-icons/fi';

import { Container } from '../Appointment/styles';
import {} from './styles';

import DateInput from '../../components/DateInput';

function Appointment() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);

  return (
    <Container>
      <ComponentHeader
        title="Pets"
        icon={<FiUser size={25} color="#fff" />}
        style={{ padding: '0 40px' }}
      />
      <div className="content">
        <div className="list">
          <div className="title">
            <h3>Todos os Pets</h3>
            <button>Adicionar Pet</button>
          </div>
          <label>
            <span className="medium-20">nome</span>
            <span className="medium-20">tipo</span>
            <span className="medium-20">raça</span>
            <span className="medium-20">sexo</span>
            <span className="medium-20"></span>
          </label>
          <ul>
            <li>
              <span className="medium-20">Teddy</span>
              <span className="medium-20">cachorro</span>
              <span className="medium-20">buldog</span>
              <span className="medium-20">macho</span>
              <span className="medium-20 center">
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
          </ul>
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
    </Container>
  );
}

export default Appointment;