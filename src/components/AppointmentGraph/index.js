import React from 'react';

import { Container } from './styles';

const months = {
  total: 2805,
  values: [156, 455, 234, 121, 313, 222, 98, 131, 653, 76, 233, 123],
};

function AppointmentGraph() {
  return (
    <Container>
      <div className="header">
        <h3>Agendamentos neste ano</h3>
        <span>Gráfico mostrando os agendamentos relizados este ano</span>
      </div>
      <div className="graph">
        <ul className="graph-data">
          <h6>total: {months.total}</h6>
          {months.values.map((value, index) => (
            <li className="data" key={index}>
              <span>{value}</span>
              <div
                style={{
                  height: `${Math.round((value * 100) / months.total)}%`,
                }}
              ></div>
            </li>
          ))}
        </ul>
        <ul className="months">
          <li>Jan</li>
          <li>Fev</li>
          <li>Mar</li>
          <li>Abr</li>
          <li>Mai</li>
          <li>Jun</li>
          <li>Jul</li>
          <li>Ago</li>
          <li>Set</li>
          <li>Out</li>
          <li>Nov</li>
          <li>Dez</li>
        </ul>
      </div>
    </Container>
  );
}

export default AppointmentGraph;
