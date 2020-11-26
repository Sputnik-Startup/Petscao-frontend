import React, { useContext, useEffect, useState } from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiEdit, FiTrash, FiUser } from 'react-icons/fi';

import { Container } from '../Appointment/styles';
import {} from './styles';
import api from '../../services/api';
import { ToastContext } from '../../context/ToastContext';
import { UserContext } from '../../context/AuthContext';
import CreateUserForm from '../../components/CreateUserForm';
import { createSchema, editSchema } from './schema';

function Customer() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [thumbnail, setThumbnail] = useState(null);

  const { token } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);

  function openEditModal(customer) {
    setSelectedCustomer(customer);
    setEditModal(true);
  }

  function openDeleteModal(customer) {
    setSelectedCustomer(customer);
    setDeleteModal(true);
  }

  useEffect(() => {
    const tk = localStorage.getItem('PC_TOKEN');

    (async () => {
      try {
        const response = await api({
          method: 'get',
          url: '/company/customer',
          headers: {
            authorization: `Bearer ${tk}`,
          },
        });

        setCustomers(response.data);
      } catch (error) {
        showToast(error.response.data.error);
      }
    })();
  }, []);

  function closeModal() {
    setSelectedCustomer({});
    setThumbnail(null);

    if (editModal) setEditModal(false);
    if (deleteModal) setDeleteModal(false);
    if (createModal) setCreateModal(false);
  }

  async function onDeleteCustomer() {
    if (selectedCustomer.id) {
      try {
        await api({
          method: 'delete',
          url: `/company/customer/${selectedCustomer.id}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setCustomers((state) =>
          state.filter((customer) => customer.id !== selectedCustomer.id)
        );
        closeModal();
      } catch (error) {
        showToast(error.response.data.error);
      }
    }
  }

  return (
    <Container>
      <ComponentHeader
        title="Clientes"
        icon={<FiUser size={25} color="#fff" />}
        style={{ padding: '0 40px' }}
      />
      <div className="content">
        <div className="list">
          <div className="title">
            <h3>Todos os Clientes</h3>
            <button onClick={() => setCreateModal(true)}>
              Adicionar Cliente
            </button>
          </div>
          <label>
            <span className="medium-20">nome</span>
            <span className="medium-20">email</span>
            <span className="medium-20">cpf</span>
            <span className="medium-20">telefone</span>
            <span className="medium-20"></span>
          </label>
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>
                <span className="medium-20">{customer.name}</span>
                <span className="medium-20">{customer.email}</span>
                <span className="medium-20">{customer.cpf}</span>
                <span className="medium-20">{customer.phone}</span>
                <span className="medium-20 center">
                  <FiEdit
                    size={22}
                    color="#039cd8"
                    title="Editar"
                    onClick={() => openEditModal(customer)}
                  />
                  <FiTrash
                    size={22}
                    color="#f55c4e"
                    title="Deletar"
                    onClick={() => openDeleteModal(customer)}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {deleteModal && (
        <div className="delete-modal">
          <div className="modal-window">
            <h3>Tem certeza?</h3>
            <div className="options" style={{ display: 'flex' }}>
              <button className="yes" onClick={onDeleteCustomer}>
                Sim
              </button>
              <button className="no" onClick={closeModal}>
                Não
              </button>
            </div>
          </div>
        </div>
      )}
      {editModal && (
        <div className="edit-modal">
          <div className="modal-window w-900">
            <CreateUserForm
              schema={editSchema}
              onSubmit={(data) => console.log(data)}
              context="customer"
              onCloseModal={closeModal}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              customer={selectedCustomer}
            />
          </div>
        </div>
      )}

      {createModal && (
        <div className="edit-modal">
          <div className="modal-window w-900">
            <CreateUserForm
              schema={editSchema}
              onSubmit={(data) => console.log(data)}
              context="customer"
              onCloseModal={closeModal}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default Customer;
