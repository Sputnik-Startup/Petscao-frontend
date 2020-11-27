import React, { useEffect, useState } from 'react';
import { ptBR } from 'date-fns/locale';
import { DatePickerCalendar } from 'react-nice-dates';
import 'react-nice-dates/build/style.css';

import { Container } from './styles';

function DatePicker(props) {
  const [date, setDate] = useState(props.date);

  useEffect(() => setDate(props.date), [props.date]);

  return (
    <Container>
      <DatePickerCalendar
        date={date}
        onDateChange={props.onSelectDate}
        locale={ptBR}
      />
      {props.dataCleanup && (
        <button onClick={props.dataCleanup}>Limpar data</button>
      )}
    </Container>
  );
}

export default DatePicker;
