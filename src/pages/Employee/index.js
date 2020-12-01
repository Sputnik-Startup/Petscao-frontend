import React, { useContext, useEffect, useState } from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiAlertCircle, FiEdit, FiTrash, FiUser } from 'react-icons/fi';

import { Container } from '../Appointment/styles';
import {} from './styles';
import api from '../../services/api';
import { UserContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';
import CreateUserForm from '../../components/CreateUserForm';
import { createSchema, editSchema } from './schema';
import useAxios from '../../hooks/useAxios';
import { format } from 'date-fns';

function Appointment() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const { token } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);

  const { data, error, mutate } = useAxios('/employee');

  if (error) {
    showToast(error.response?.data.error || 'Ocorreu um erro');
  }

  function onOpenEditModal(employee) {
    setSelectedEmployee(employee);

    setEditModal(true);
  }

  function onOpenDeleteModal(employee) {
    setSelectedEmployee(employee);

    setDeleteModal(true);
  }

  function closeModal() {
    setSelectedEmployee({});
    setThumbnail(null);

    if (editModal) setEditModal(false);
    if (deleteModal) setDeleteModal(false);
    if (createModal) setCreateModal(false);
  }

  async function handleSearch(e) {
    const search = e.target.value;

    try {
      const response = await api({
        method: 'get',
        url: `/employee?q=${search}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      mutate(response.data, false);
    } catch (error) {
      showToast(error.response.data.error);
    }
  }

  async function handleCreateEmployee(dataForm) {
    const form = new FormData();

    Object.keys(dataForm).map((key) => form.append(key, dataForm[key]));
    form.append('avatar', thumbnail);

    try {
      const response = await api({
        method: 'post',
        url: '/employee',
        data: form,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      mutate([response.data, ...data]);
      closeModal();
      showToast(
        'Funcionário criado com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
    } catch (error) {
      showToast(error.response.data.error);
    }
  }

  async function handleEditEmployee(dataForm) {
    api({
      method: 'put',
      url: `/employee/${selectedEmployee.id}`,
      data: dataForm,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (thumbnail) {
      const form = new FormData();
      form.append('avatar', thumbnail);
      api({
        method: 'patch',
        url: `/avatar/${selectedEmployee.id}?context=employee`,
        data: form,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    const employeesUpdated = data.map((employee) => {
      if (employee.id === selectedEmployee.id) {
        return {
          ...dataForm,
          id: selectedEmployee.id,
          email: selectedEmployee.email,
          avatar: {
            url: thumbnail
              ? URL.createObjectURL(thumbnail)
              : selectedEmployee.avatar?.url,
          },
          birth_date: format(dataForm.birth_date, 'yyyy-MM-dd hh:mm'),
        };
      }

      return employee;
    });
    mutate(employeesUpdated, false);
    closeModal();
    showToast(
      'Funcionário editado com sucesso!',
      <FiAlertCircle color="#78cf9d" size={35} />
    );
  }

  async function handleDeleteEmployee() {
    if (selectedEmployee.id) {
      api({
        method: 'delete',
        url: `/employee/${selectedEmployee.id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const employeeUpdated = data.filter(
        (employee) => employee.id !== selectedEmployee.id
      );
      mutate(employeeUpdated, false);
      closeModal();
      showToast(
        'Funcionário deletado com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
    }
  }

  return (
    <Container>
      <ComponentHeader
        title="Funcionários"
        icon={<FiUser size={25} color="#fff" />}
        style={{ padding: '0 40px' }}
      />
      <div className="content">
        <div className="list">
          <div className="title">
            <h3>Todos os Funcionários</h3>
            <div>
              <input
                type="text"
                name="search-employee"
                id="search-employee"
                placeholder="Pesquisar..."
                onChange={handleSearch}
              />
              <button onClick={() => setCreateModal(true)}>
                Adicionar Cliente
              </button>
            </div>
          </div>
          <label>
            <span className="medium-20">nome</span>
            <span className="medium-20">nome de usuário</span>
            <span className="medium-20">cpf</span>
            <span className="medium-20">telefone</span>
            <span className="medium-20"></span>
          </label>
          <ul>
            {data?.map((employee) => (
              <li key={employee.id}>
                <span className="medium-20">{employee.name}</span>
                <span className="medium-20">{employee.username}</span>
                <span className="medium-20">{employee.cpf}</span>
                <span className="medium-20">{employee.phone}</span>
                <span className="medium-20 center">
                  <FiEdit
                    size={22}
                    color="#039cd8"
                    title="Editar"
                    onClick={() => onOpenEditModal(employee)}
                  />
                  <FiTrash
                    size={22}
                    color="#f55c4e"
                    title="Deletar"
                    onClick={() => onOpenDeleteModal(employee)}
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
              <button className="yes" onClick={handleDeleteEmployee}>
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
              onSubmit={handleEditEmployee}
              context="employee"
              onCloseModal={closeModal}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              value={selectedEmployee}
            />
          </div>
        </div>
      )}
      {createModal && (
        <div className="create-modal">
          <div className="modal-window w-900">
            <CreateUserForm
              schema={createSchema}
              onSubmit={handleCreateEmployee}
              context="employee"
              onCloseModal={closeModal}
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              value={selectedEmployee}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default Appointment;
