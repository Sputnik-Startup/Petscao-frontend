import React, { useEffect, useRef, useState } from 'react';
import DashboardAside from '../../components/DashboardAside';
import NavBar from '../../components/NavBar';
import DashboardRoute from './dashboardRoute';

import { Container } from './styles';

import dog from '../../assets/dog-running.gif';
import logo from '../../assets/logo.svg';

function Dashboard() {
  const [splash, setSplash] = useState(true);
  const contentRef = useRef(null);
  const timeoutRef = useRef(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => setSplash(false), 2000);

    return () => clearTimeout(timeoutRef.current);
  }, []);
  return (
    <Container>
      <div className={splash ? 'splash' : 'splash close'}>
        <img src={logo} alt="logo" />
        <img src={dog} alt="dog-running" />
      </div>
      <DashboardAside contentRef={contentRef} />
      <div id="dashboard-content" ref={contentRef}>
        <NavBar />
        <DashboardRoute />
      </div>
    </Container>
  );
}

export default Dashboard;
