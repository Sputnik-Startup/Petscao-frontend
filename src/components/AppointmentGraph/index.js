import React from 'react';
import useAxios from '../../hooks/useAxios';

import { Container } from './styles';

function AppointmentGraph() {
  const { data } = useAxios('/company/appointment/month');

  return (
    <Container>
      <div className="header">
        <h3>Agendamentos neste ano</h3>
        <span>Gráfico mostrando o desempenho em cada mês</span>
      </div>
      <div className="graph">
        <ul className="graph-data">
          <h6>total: {data?.total}</h6>
          {data &&
            Object.values(data.values).map((value, index) => (
              <li className="data" key={index}>
                <span>{value}</span>
                <div
                  style={{
                    height: `${Math.round((value * 100) / data?.total)}%`,
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
