import React from 'react';
import ComponentHeader from '../../components/ComponentHeader';
import { FiCalendar } from 'react-icons/fi';

import { Container } from './styles';

function Appointment() {
  return (
    <Container>
      <ComponentHeader
        title="Agendamentos"
        icon={<FiCalendar size={25} color="#fff" />}
      />
    </Container>
  );
}

export default Appointment;
