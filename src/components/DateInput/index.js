import { format } from 'date-fns/esm';
import { ptBR } from 'date-fns/esm/locale';
import React, { useEffect, useState } from 'react';
import DatePicker from '../../components/DatePicker';

import { Container } from './styles';

const hoursArr = [
  {
    time: '08:00',
    value: '2020-11-27T08:00:00-03:00',
    available: true,
  },
  {
    time: '09:00',
    value: '2020-11-27T09:00:00-03:00',
    available: true,
  },
  {
    time: '10:00',
    value: '2020-11-27T10:00:00-03:00',
    available: true,
  },
  {
    time: '11:00',
    value: '2020-11-27T11:00:00-03:00',
    available: true,
  },
  {
    time: '12:00',
    value: '2020-11-27T12:00:00-03:00',
    available: true,
  },
  {
    time: '13:00',
    value: '2020-11-27T13:00:00-03:00',
    available: true,
  },
  {
    time: '14:00',
    value: '2020-11-27T14:00:00-03:00',
    available: true,
  },
  {
    time: '15:00',
    value: '2020-11-27T15:00:00-03:00',
    available: true,
  },
  {
    time: '16:00',
    value: '2020-11-27T16:00:00-03:00',
    available: true,
  },
  {
    time: '17:00',
    value: '2020-11-27T17:00:00-03:00',
    available: true,
  },
  {
    time: '18:00',
    value: '2020-11-27T18:00:00-03:00',
    available: false,
  },
  {
    time: '19:00',
    value: '2020-11-27T19:00:00-03:00',
    available: true,
  },
  {
    time: '20:00',
    value: '2020-11-27T20:00:00-03:00',
    available: true,
  },
];

function DateInput(props) {
  const [showHours, setShowHours] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(null);
  const [hours, setHours] = useState('');

  useEffect(
    () => props.setDate(`${date ? format(date, 'yyyy-mm-dd') : ''} ${hours}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, hours]
  );
  useEffect(() => console.log(props.date), []);

  function onSelectDate(date) {
    setDate(date);
    setShowCalendar(false);
  }

  function selectHour(hour) {
    setHours(hour);
    setShowHours(false);
  }

  return (
    <Container>
      <button
        className="open-calendar"
        onClick={(e) => {
          e.preventDefault();
          setShowCalendar(true);
        }}
      >
        {date
          ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
          : 'Clique para abrir o calendário'}
      </button>
      <div className="hour-input">
        <input
          type="text"
          placeholder={date ? 'Selecione uma hora' : 'Selecione uma data'}
          defaultValue={hours}
          readOnly
          onFocus={() => setShowHours(true)}
          onClick={() => setShowHours(true)}
          onBlur={() => setShowHours(false)}
        />
        {showHours && date && (
          <ul className="hour-dropdown">
            {hoursArr.map((hour) => {
              if (hour.available) {
                return (
                  <li
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectHour(hour.time)}
                  >
                    {hour.time}
                  </li>
                );
              }
              return null;
            })}
          </ul>
        )}
      </div>
      {showCalendar && (
        <div className="calendar-modal">
          <div className="modal-window">
            <DatePicker date={date} onSelectDate={onSelectDate} />
          </div>
        </div>
      )}
    </Container>
  );
}

export default DateInput;
