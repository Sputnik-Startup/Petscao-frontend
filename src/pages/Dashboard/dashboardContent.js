import { format, parseISO } from 'date-fns/esm';
import { ptBR } from 'date-fns/esm/locale';
import React, { useContext, useState } from 'react';
import { FiHome } from 'react-icons/fi';
import AppointmentGraph from '../../components/AppointmentGraph';
import ComponentHeader from '../../components/ComponentHeader';
import { UserContext } from '../../context/AuthContext';
import api from '../../services/api';

import { ContentContainer } from './styles';

function DashboardContent() {
  const [dayAppointment, setDayAppointment] = useState([]);
  const [day, setDay] = useState('');

  const { token } = useContext(UserContext);

  async function handleSelectDay(day) {
    setDay(day);

    const appointments = await api.get(`/company/appointment?day=${day}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setDayAppointment((_) =>
      appointments.data.map((app) => ({
        ...app,
        formatted_date: format(parseISO(app.date), "hh:mm'h'", {
          locale: ptBR,
        }),
      }))
    );
  }

  return (
    <ContentContainer>
      <ComponentHeader
        title="Dashboard"
        icon={<FiHome size={25} color="#fff" />}
      />
      <div className="content">
        <div
          className="week-appointments"
          style={{ height: dayAppointment[0] ? '427px' : '217px' }}
        >
          <h3>Agendamentos nessa semana</h3>
          <span>Selecione um dia da semana</span>
          <ul className="weekdays">
            <li
              onClick={() => handleSelectDay('sun')}
              className={day === 'sun' ? 'selected' : null}
            >
              Dom
            </li>
            <li
              onClick={() => handleSelectDay('mon')}
              className={day === 'mon' ? 'selected' : null}
            >
              Seg
            </li>
            <li
              onClick={() => handleSelectDay('tue')}
              className={day === 'tue' ? 'selected' : null}
            >
              Ter
            </li>
            <li
              onClick={() => handleSelectDay('wed')}
              className={day === 'wed' ? 'selected' : null}
            >
              Qua
            </li>
            <li
              onClick={() => handleSelectDay('thu')}
              className={day === 'thu' ? 'selected' : null}
            >
              Qui
            </li>
            <li
              onClick={() => handleSelectDay('fri')}
              className={day === 'fri' ? 'selected' : null}
            >
              Sex
            </li>
            <li
              onClick={() => handleSelectDay('sat')}
              className={day === 'sat' ? 'selected' : null}
            >
              Sab
            </li>
          </ul>
          <ul className="appointments">
            {dayAppointment[0] ? (
              dayAppointment.map((appointment, index) => (
                <li className="appointment" key={index}>
                  <span>
                    <strong>Cliente:</strong>
                    {appointment.customer.name}
                  </span>
                  <span>
                    <strong>Pet:</strong>
                    {appointment.pet.name}
                  </span>
                  <span>
                    <strong>Hora:</strong>
                    {appointment.formatted_date}
                  </span>
                </li>
              ))
            ) : (
              <li className="no-day">Nada para mostrar</li>
            )}
          </ul>
        </div>
        <AppointmentGraph />
        <div className="last-appointment">
          <h3>Último agendamento</h3>
          <span>Último agendamento registrado. Informação em tempo real</span>
          <div className="appointment">
            <div className="column">
              <img
                src="https://somos.lojaiplace.com.br/wp-content/uploads/2018/10/app-retoca-selfie.jpg"
                alt="customer"
              />
              <span>Carla Oliveira</span>
            </div>
            <div className="column">
              <img
                src="https://www.selecoes.com.br/wp-content/uploads/2018/08/brinquedos-para-cachorro-760x450.jpg"
                alt="pet"
              />
              <span>Teddy</span>
            </div>
            <div className="column">
              <img
                src="https://iconsetc.com/icons-watermarks/flat-circle-white-on-yellow/bfa/bfa_calendar/bfa_calendar_flat-circle-white-on-yellow_512x512.png"
                className="not-rounded"
                alt="calendar"
              />
              <span>22/11/2020 às 14:00h</span>
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}

export default DashboardContent;
