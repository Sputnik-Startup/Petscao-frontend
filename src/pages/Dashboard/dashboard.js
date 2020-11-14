import React, { useRef } from 'react';
import DashboardAside from '../../components/DashboardAside';
import NavBar from '../../components/NavBar';
import DashboardRoute from './dashboardRoute';

import { Container } from './styles';

function Dashboard() {
  const contentRef = useRef(null);

  return (
    <Container>
      <DashboardAside contentRef={contentRef} />
      <div id="dashboard-content" ref={contentRef}>
        <NavBar />
        <DashboardRoute />
      </div>
    </Container>
  );
}

export default Dashboard;
