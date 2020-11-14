import React, { useState } from 'react';
import { FiHome } from 'react-icons/fi';
import ComponentHeader from '../../components/ComponentHeader';

import { ContentContainer } from './styles';

function DashboardContent() {
  const [dayAppointment, setDayAppointment] = useState([]);
  const [day, setDay] = useState('');

  function handleSelectDay(day) {
    setDay(day);
    setDayAppointment([
      {
        customer: {
          name: 'João Paulo',
        },
        pet: {
          name: 'Teddy',
        },
        date: '14:00',
      },
      {
        customer: {
          name: 'João Paulo',
        },
        pet: {
          name: 'Teddy',
        },
        date: '14:00',
      },
      {
        customer: {
          name: 'João Paulo',
        },
        pet: {
          name: 'Teddy',
        },
        date: '14:00',
      },
      {
        customer: {
          name: 'João Paulo',
        },
        pet: {
          name: 'Teddy',
        },
        date: '14:00',
      },
      {
        customer: {
          name: 'João Paulo',
        },
        pet: {
          name: 'Teddy',
        },
        date: '14:00',
      },
    ]);
  }

  return (
    <ContentContainer>
      <ComponentHeader
        title="Dashboard"
        icon={<FiHome size={25} color="#fff" />}
      />
      <div className="content">
        <div className="week-appointments">
          <h3>Agendamentos nessa semana</h3>
          <span>Selecione um dia da semana</span>
          <ul className="weekdays">
            <li
              onClick={() => handleSelectDay('dom')}
              className={day === 'dom' ? 'selected' : null}
            >
              Dom
            </li>
            <li
              onClick={() => handleSelectDay('seg')}
              className={day === 'seg' ? 'selected' : null}
            >
              Seg
            </li>
            <li
              onClick={() => handleSelectDay('ter')}
              className={day === 'ter' ? 'selected' : null}
            >
              Ter
            </li>
            <li
              onClick={() => handleSelectDay('qua')}
              className={day === 'qua' ? 'selected' : null}
            >
              Qua
            </li>
            <li
              onClick={() => handleSelectDay('qui')}
              className={day === 'qui' ? 'selected' : null}
            >
              Qui
            </li>
            <li
              onClick={() => handleSelectDay('sex')}
              className={day === 'sex' ? 'selected' : null}
            >
              Sex
            </li>
            <li
              onClick={() => handleSelectDay('sab')}
              className={day === 'sab' ? 'selected' : null}
            >
              Sab
            </li>
          </ul>
          <ul className="appointments">
            {dayAppointment[0] ? (
              dayAppointment.map((appointment) => (
                <li className="appointment">
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
                    {appointment.date}h
                  </span>
                </li>
              ))
            ) : (
              <li className="no-day">Nada para mostrar</li>
            )}
          </ul>
        </div>
      </div>
    </ContentContainer>
  );
}

export default DashboardContent;
