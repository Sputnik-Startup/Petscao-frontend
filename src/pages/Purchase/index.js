import React, { useContext, useEffect, useState } from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiShoppingCart, FiEdit, FiTrash, FiAlertCircle } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Container } from './styles';
import DateInput from '../../components/DateInput';
import CustomerPicker from '../../components/CustomerPicker';
import PetPicker from '../../components/PetPicker';
import api from '../../services/api';
import { UserContext } from '../../context/AuthContext';
import { ToastContext } from '../../context/ToastContext';
import { schema } from './schema';
import useAxios from '../../hooks/useAxios';

function Purchases() {
  const { register, handleSubmit, errors, setValue, getValues } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    errors: errors2,
    setValue: setValue2,
    getValues: getValues2,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, error, mutate } = useAxios('/company/purchase');

  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [createPurchaseModal, setCreatePurchaseModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedPurchase, setSelectedPurchase] = useState({});

  const { token } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);

  if (error) {
    showToast(error.response?.data.error || 'Ocorreu um erro');
  }

  function openEditModal(purchase) {
    setSelectedPurchase(purchase);

    setEditModal(true);
  }

  function openDeleteModal(purchase) {
    setSelectedPurchase(purchase);

    setDeleteModal(true);
    setValue('descount', selectedPurchase.descount);
    setValue('price', selectedPurchase.price);
  }

  function closeModal() {
    setSelectedPurchase({});
    setSelectedCustomer({});

    if (editModal) setEditModal(false);
    if (deleteModal) setDeleteModal(false);
    if (createPurchaseModal) setCreatePurchaseModal(false);
  }

  function setTotalPrice() {
    const descount = getValues('descount');
    const price = getValues('price');

    console.log(price, descount);
    const value =
      Number(price.replace('.', '').replace(',', '.')) -
      Number(descount.replace('.', '').replace(',', '.'));
    if (value >= 0) {
      setValue(
        'total_price',
        value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      );
    } else {
      setValue(
        'total_price',
        (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      );
    }
  }

  function setTotalPrice2() {
    const descount = getValues2('descount');
    const price = getValues2('price');

    const value =
      Number(price.replace('.', '').replace(',', '.')) -
      Number(descount.replace('.', '').replace(',', '.'));
    if (value >= 0) {
      setValue2(
        'total_price',
        value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      );
    } else {
      setValue2(
        'total_price',
        (0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      );
    }
  }

  const handleEditPurchase = async (dataForm) => {
    dataForm.total_price = dataForm.total_price.replace('R$', '').trim();

    api({
      method: 'put',
      url: `/company/purchase/${selectedPurchase.id}`,
      data: dataForm,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const purchasesUpdated = data.map((purc) => {
      if (purc.id === selectedPurchase.id) {
        return {
          ...dataForm,
          customer: selectedPurchase.customer,
          id: selectedPurchase.id,
        };
      }

      return purc;
    });
    mutate(purchasesUpdated, false);
    closeModal();
    showToast(
      'Compra editada com sucesso!',
      <FiAlertCircle color="#78cf9d" size={35} />
    );
  };

  const handleDeletePurchase = async () => {
    if (selectedPurchase.id) {
      api({
        method: 'delete',
        url: `/company/purchase/${selectedPurchase.id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const purchaseUpdated = data.filter(
        (purc) => purc.id !== selectedPurchase.id
      );

      mutate(purchaseUpdated, false);

      closeModal();
      showToast(
        'Compra deletada com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
    }
  };

  const handleCreatePurchase = async (dataForm) => {
    dataForm.total_price = dataForm.total_price.replace('R$', '').trim();
    if (!selectedCustomer.id) {
      showToast('Selecione um cliente');
      return;
    }

    try {
      const response = await api({
        method: 'post',
        url: '/company/purchase',
        data: {
          ...dataForm,
          user_id: selectedCustomer.id,
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      mutate([response.data, ...data], false);
      closeModal();
      showToast(
        'Compra registrada com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );
    } catch (error) {
      showToast(error.response?.data.error || 'Erro ao criar compra');
    }
  };

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
            <h3>Todas as compras</h3>
            <button onClick={() => setCreatePurchaseModal(true)}>
              Criar compra
            </button>
          </div>
          <label>
            <span className="big">cliente</span>
            <span className="small">desconto</span>
            <span className="small">preço</span>
            <span className="small">preço total</span>
            <div className="small center"></div>
          </label>
          <ul>
            {data?.map((purchase) => (
              <li key={purchase.id}>
                <span className="big">{purchase.customer.name}</span>
                <span className="small">
                  {Number(
                    purchase.descount.replace('.', '').replace(',', '.')
                  ).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <span className="small">
                  {Number(
                    purchase.price.replace('.', '').replace(',', '.')
                  ).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <span className="small">
                  {Number(
                    purchase.total_price.replace('.', '').replace(',', '.')
                  ).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
                <span className="small center">
                  <FiEdit
                    size={22}
                    color="#039cd8"
                    title="Editar"
                    onClick={() => openEditModal(purchase)}
                  />
                  <FiTrash
                    size={22}
                    color="#f55c4e"
                    title="Deletar"
                    onClick={() => openDeleteModal(purchase)}
                  />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="cards">
          <div className="card" style={{ backgroundColor: '#498bfc' }}>
            <div className="circle" style={{ border: '5px solid #7dabfa' }}>
              {data?.length}
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
              <button className="yes" onClick={handleDeletePurchase}>
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
            <form onSubmit={handleSubmit(handleEditPurchase)}>
              <label htmlFor="price">Preço</label>
              <input
                name="price"
                placeholder="Preço"
                defaultValue={selectedPurchase.price}
                onChange={setTotalPrice}
                ref={register()}
                style={{ marginBottom: errors.price ? '5px' : '10px' }}
              />
              {errors.price && <p className="error">{errors.price.message}</p>}

              <label htmlFor="descount">Desconto</label>
              <input
                name="descount"
                placeholder="Desconto"
                defaultValue={selectedPurchase.descount}
                onChange={setTotalPrice}
                ref={register()}
                style={{ marginBottom: errors.descount ? '5px' : '10px' }}
              />
              {errors.descount && (
                <p className="error">{errors.descount.message}</p>
              )}

              <label htmlFor="total_price">Preço total</label>
              <input
                name="total_price"
                placeholder="Preço total"
                defaultValue={Number(
                  selectedPurchase.total_price
                    .replace('.', '')
                    .replace(',', '.')
                ).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
                ref={register()}
                style={{ marginBottom: errors.total_price ? '5px' : '10px' }}
              />
              {errors.total_price && (
                <p className="error">{errors.total_price.message}</p>
              )}

              <div className="row">
                <button type="submit" className="yes">
                  Salvar
                </button>
                <button className="blue" onClick={closeModal}>
                  Voltar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {createPurchaseModal && (
        <div className="create-modal">
          <div className="modal">
            <CustomerPicker
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
            />
            <form onSubmit={handleSubmit2(handleCreatePurchase)}>
              <label htmlFor="price">Preço</label>
              <input
                name="price"
                placeholder="Preço"
                onChange={setTotalPrice2}
                ref={register2()}
                style={{ marginBottom: errors2.price ? '5px' : '10px' }}
              />
              {errors2.price && (
                <p className="error">{errors2.price.message}</p>
              )}

              <label htmlFor="descount">Desconto</label>
              <input
                name="descount"
                placeholder="Desconto"
                onChange={setTotalPrice2}
                ref={register2()}
                style={{ marginBottom: errors2.descount ? '5px' : '10px' }}
              />
              {errors2.descount && (
                <p className="error">{errors2.descount.message}</p>
              )}

              <label htmlFor="total_price">Preço total</label>
              <input
                name="total_price"
                placeholder="Preço total"
                defaultValue="R$ 0,00"
                ref={register2()}
                style={{ marginBottom: errors2.total_price ? '5px' : '10px' }}
              />
              {errors2.total_price && (
                <p className="error">{errors2.total_price.message}</p>
              )}

              <div className="row">
                <button type="submit" className="yes">
                  Salvar
                </button>
                <button className="blue" onClick={closeModal}>
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
