import React, { useContext, useEffect, useState } from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import CustomerPicker from '../../components/CustomerPicker';
import { FiAlertCircle, FiEdit, FiTrash } from 'react-icons/fi';
import PetForm from '../../components/PetForm';

import { Container } from '../Appointment/styles';
import {} from './styles';

import { ToastContext } from '../../context/ToastContext';
import { UserContext } from '../../context/AuthContext';
import api from '../../services/api';
import { schema } from './schema';
import Pawn from '../../assets/Pawn-white.svg';
import useAxios from '../../hooks/useAxios';

function Appointment() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState({});
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedCustomerSearch, setSelectedCustomerSearch] = useState(null);

  const { data, error, revalidate, mutate } = useAxios(
    selectedCustomerSearch
      ? `/company/pet?owner=${selectedCustomerSearch.id}`
      : '/company/pet'
  );

  const { token } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);

  function onOpenEditModal(pet) {
    setSelectedPet(pet);

    setEditModal(true);
  }

  function onOpenDeleteModal(pet) {
    setSelectedPet(pet);

    setDeleteModal(true);
  }

  function closeModal() {
    setSelectedPet({});
    setThumbnail(null);

    if (editModal) setEditModal(false);
    if (deleteModal) setDeleteModal(false);
    if (createModal) setCreateModal(false);
  }

  async function handleDeletePet() {
    if (selectedPet.id) {
      api({
        method: 'delete',
        url: `/company/pet/${selectedPet.id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const updatedPets = data.filter((pet) => pet.id !== selectedPet.id);
      mutate(updatedPets, false);
      closeModal();
      showToast(
        'Pet deletado com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
    }
  }

  async function handleCreatePet(dataForm) {
    const form = new FormData();

    Object.keys(dataForm).map((key) =>
      form.append(key, key !== 'owner_id' && dataForm[key])
    );
    form.append('avatar', thumbnail);

    try {
      const response = await api({
        method: 'post',
        url: `/company/pet?c=${dataForm.owner_id}`,
        data: form,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      mutate([response.data, ...data]);
      closeModal();
      showToast(
        'Pet criado com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
    } catch (error) {
      showToast(error.response.data.error);
    }
  }

  async function handleEditPet(dataForm) {
    api({
      method: 'put',
      url: `/company/pet/${selectedPet.id}`,
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
        url: `/avatar/${selectedPet.id}?context=pet`,
        data: form,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    const petsUpdated = data.map((pet) => {
      if (pet.id === selectedPet.id) {
        return {
          ...selectedPet,
          ...dataForm,
          id: selectedPet.id,
          avatar: {
            url: thumbnail
              ? URL.createObjectURL(thumbnail)
              : selectedPet.avatar?.url,
          },
        };
      }

      return pet;
    });
    mutate(petsUpdated, false);
    closeModal();
    showToast(
      'Pet editado com sucesso!',
      <FiAlertCircle color="#78cf9d" size={35} />
    );
  }

  return (
    <Container>
      <ComponentHeader
        title="Pets"
        icon={<img src={Pawn} alt="pawn" style={{ width: '25px' }} />}
        style={{ padding: '0 40px' }}
      />
      <div className="content">
        <div className="list">
          <div className="title">
            <h3>Todos os Pets</h3>
            <div>
              <CustomerPicker
                selectedCustomer={selectedCustomerSearch}
                setSelectedCustomer={setSelectedCustomerSearch}
                style={{
                  marginRight: '20px',
                  marginBottom: '0',
                  height: '100%',
                }}
                buttonStyle={{
                  height: '100%',
                  width: '200px',
                  boxShadow: '0 0 20px 10px #0000000d',
                }}
              />
              <button
                onClick={() => setCreateModal(true)}
                style={{ minWidth: '150px' }}
              >
                Adicionar Pet
              </button>
            </div>
          </div>
          <label>
            <span className="medium-20">nome</span>
            <span className="medium-20">tipo</span>
            <span className="medium-20">raça</span>
            <span className="medium-20">nome do dono</span>
            <span className="medium-20"></span>
          </label>
          <ul>
            {data?.map((pet) => (
              <li key={pet.id}>
                <span className="medium-20">{pet.name}</span>
                <span className="medium-20">{pet.type}</span>
                <span className="medium-20">{pet.breed.toLowerCase()}</span>
                <span className="medium-20">{pet.owner.name}</span>
                <span className="medium-20 center">
                  <FiEdit
                    size={22}
                    color="#039cd8"
                    title="Editar"
                    onClick={() => onOpenEditModal(pet)}
                  />
                  <FiTrash
                    size={22}
                    color="#f55c4e"
                    title="Deletar"
                    onClick={() => onOpenDeleteModal(pet)}
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
              <button className="yes" onClick={handleDeletePet}>
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
          <div className="modal-window w-500">
            <PetForm
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              value={selectedPet}
              onCloseModal={closeModal}
              onSubmit={handleEditPet}
              schema={schema}
            />
          </div>
        </div>
      )}
      {createModal && (
        <div className="create-modal">
          <div className="modal-window w-500">
            <PetForm
              thumbnail={thumbnail}
              setThumbnail={setThumbnail}
              onCloseModal={closeModal}
              onSubmit={handleCreatePet}
              schema={schema}
            />
          </div>
        </div>
      )}
    </Container>
  );
}

export default Appointment;
