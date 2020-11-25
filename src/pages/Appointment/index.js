import React, { useContext, useEffect, useState } from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiAlertCircle, FiCalendar, FiEdit, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
import DateInput from '../../components/DateInput';
import CustomerPicker from '../../components/CustomerPicker';
import PetPicker from '../../components/PetPicker';
import api from '../../services/api';
import { UserContext } from '../../context/AuthContext';
import { format } from 'date-fns/esm';
import { isBefore, parseISO } from 'date-fns';
import { ToastContext } from '../../context/ToastContext';
import { ptBR } from 'date-fns/esm/locale';

function Appointment() {
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [updateDate, setUpdateDate] = useState(null);
  const [createAppointmentModal, setCreateAppointmentModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [selectedPet, setSelectedPet] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const [appointments, setAppointments] = useState([]);

  const { token } = useContext(UserContext);
  const { showToast, hideToast } = useContext(ToastContext);

  useEffect(() => {
    (async () => {
      const response = await api.get('/company/appointment', {
        headers: { authorization: `Bearer ${token}` },
      });

      setAppointments((_) =>
        response.data.map((app) => ({
          ...app,
          formatted_date: format(
            parseISO(app.date),
            "dd/MM/yyyy à's' HH:mm'h'",
            {
              locale: ptBR,
            }
          ),
        }))
      );
    })();
  }, [token]);

  function openDeleteModal(appointment) {
    setSelectedAppointment(appointment);

    setDeleteModal(true);
  }

  function openEditModal(appointment) {
    setSelectedAppointment(appointment);

    setEditModal(true);
  }

  function closeModal() {
    setSelectedAppointment({});
    setSelectedCustomer({});
    setSelectedPet({});
    setUpdateDate('');

    if (editModal) setEditModal(false);
    if (deleteModal) setDeleteModal(false);
    if (createAppointmentModal) setCreateAppointmentModal(false);
  }

  async function editAppointment(e) {
    e.preventDefault();
    if (
      /^[0-9][0-9][0-9][0-9]+-[0-9][0-9]+-[0-9][0-9] [0-9][0-9]+:[0-9][0-9]/g.test(
        updateDate
      )
    ) {
      try {
        const response = await api({
          method: 'put',
          url: `/company/appointment/${selectedAppointment.id}`,
          data: {
            date: new Date(updateDate),
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        hideToast();
        if (response.data.error) {
          showToast('Erro ao atualizar agendamento');
        } else {
          setAppointments((state) =>
            state.map((appointment) => {
              if (appointment.id === response.data.id) {
                return {
                  ...response.data,
                  formatted_date: format(
                    parseISO(response.data.date),
                    "dd/MM/yyyy à's' HH:mm'h'",
                    {
                      locale: ptBR,
                    }
                  ),
                };
              }

              return { ...appointment };
            })
          );

          closeModal();
        }
      } catch (error) {
        showToast(error.response.data.error);
      }
    } else {
      showToast('Selecione a data e a hora');
    }
  }

  async function createAppointment() {
    if (!selectedCustomer.id) {
      showToast('Selecione um cliente');
      return;
    } else if (!selectedPet.id) {
      showToast('Selecione um pet');
      return;
    } else if (!updateDate) {
      showToast('Selecione uma data');
      return;
    }

    if (
      /^[0-9][0-9][0-9][0-9]+-[0-9][0-9]+-[0-9][0-9] [0-9][0-9]+:[0-9][0-9]/g.test(
        updateDate
      )
    ) {
      try {
        const response = await api({
          method: 'post',
          url: '/company/appointment',
          data: {
            user_id: selectedCustomer.id,
            pet_id: selectedPet.id,
            date: new Date(updateDate),
          },
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setAppointments((state) => [
          {
            ...response.data,
            formatted_date: format(
              parseISO(response.data.date),
              "dd/MM/yyyy à's' HH:mm'h'",
              {
                locale: ptBR,
              }
            ),
          },
          ...state,
        ]);
        closeModal();
      } catch (error) {
        showToast(error.response.data.error || 'teste');
      }
    } else {
      showToast('Selecione a data e a hora');
    }
  }

  async function deleteAppointment() {
    try {
      await api({
        method: 'delete',
        url: `/company/appointment/${selectedAppointment.id}`,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setAppointments((state) =>
        state.filter((app) => app.id !== selectedAppointment.id)
      );

      showToast(
        'Agendamento deletado com sucesso!',
        <FiAlertCircle color="#78cf9d" size={35} />
      );

      closeModal();
    } catch (error) {
      showToast(error.response.data.error);
    }
  }

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
            {appointments.map((appointment) => (
              <li key={appointment.id}>
                <span className="medium">{appointment.customer.name}</span>
                <span className="medium">{appointment.pet.name}</span>
                <span className="big">{appointment.formatted_date}</span>
                <span className="small">
                  <FiEdit
                    size={22}
                    color="#039cd8"
                    title="Editar"
                    onClick={() => openEditModal(appointment)}
                  />
                  <FiTrash
                    size={22}
                    color="#f55c4e"
                    title="Deletar"
                    onClick={() => openDeleteModal(appointment)}
                  />
                </span>
              </li>
            ))}
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
              <button className="yes" onClick={deleteAppointment}>
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
            <form>
              <label>Selecione uma data</label>
              <DateInput setDate={setUpdateDate} date={updateDate} />

              <div className="row">
                <button className="yes" onClick={editAppointment}>
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

      {createAppointmentModal && (
        <div className="create-modal">
          <div className="modal">
            <CustomerPicker
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
            />
            <PetPicker
              hasCustomer={!!selectedCustomer.name}
              owner={selectedCustomer?.id}
              selectedPet={selectedPet}
              setSelectedPet={setSelectedPet}
            />
            <DateInput setDate={setUpdateDate} date={updateDate} />

            <div className="row">
              <button className="yes" onClick={createAppointment}>
                Salvar
              </button>
              <button className="blue" onClick={closeModal}>
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
