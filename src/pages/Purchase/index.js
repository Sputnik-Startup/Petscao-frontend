import React, { useState } from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiShoppingCart, FiEdit, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import DateInput from '../../components/DateInput';

function Purchases() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);

  return (
    <Container>
      <ComponentHeader
        title="Compras"
        icon={<FiShoppingCart size={25} color="#fff" />}
        style={{ padding: '0 40px' }}
      />
      <div className="content">
        <div className="list">
          <div className="title">
            <h3>Todos as compras</h3>
            <button>Criar compra</button>
          </div>
          <label>
            <span className="big">cliente</span>
            <span className="medium">pet</span>
            <span className="small">desconto</span>
            <span className="small">preço</span>
            <span className="small">preço total</span>
            <div className="small center"></div>
          </label>
          <ul>
            <li>
              <span className="big">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="small">R$0,00</span>
              <span className="small">R$120,00</span>
              <span className="small">R$120,00</span>
              <span className="small center">
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
              <span className="big">José Carlos</span>
              <span className="medium">Teddy</span>
              <span className="small">R$40,00</span>
              <span className="small">R$120,00</span>
              <span className="small">R$80,00</span>
              <span className="small center">
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
        <div className="cards">
          <div className="card" style={{ backgroundColor: '#498bfc' }}>
            <div className="circle" style={{ border: '5px solid #7dabfa' }}>
              3526
            </div>
            <span>Total de compras</span>
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
    </Container>
  );
}

export default Purchases;
