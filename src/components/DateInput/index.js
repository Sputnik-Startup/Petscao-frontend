import { format } from 'date-fns/esm';
import { ptBR } from 'date-fns/esm/locale';
import React, { useContext, useEffect, useState } from 'react';
import DatePicker from '../../components/DatePicker';
import { ToastContext } from '../../context/ToastContext';
import api from '../../services/api';

import { Container } from './styles';

function DateInput(props) {
  const [showHours, setShowHours] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState('');
  const [hours, setHours] = useState([]);

  const { showToast } = useContext(ToastContext);

  useEffect(
    () => props.setDate(`${date ? format(date, 'yyyy-MM-dd') : ''} ${hour}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [date, hour]
  );

  async function onSelectDate(date) {
    setDate(date);
    setShowCalendar(false);
    const dateFormated = format(date, 'yyyy-MM-dd', { locale: ptBR });
    try {
      const response = await api({
        method: 'get',
        url: `/appointment/available?date=${dateFormated}`,
      });

      setHours(response.data);
    } catch (error) {
      showToast(error.response.data.error);
      setDate(null);
    }
  }

  function selectHour(hour) {
    setHour(hour);
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
          defaultValue={hour}
          readOnly
          onFocus={() => setShowHours(true)}
          onClick={() => setShowHours(true)}
          onBlur={() => setShowHours(false)}
        />
        {showHours && date && (
          <ul className="hour-dropdown">
            {hours.map((hour) => {
              if (hour.available) {
                return (
                  <li
                    key={hour.value}
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
