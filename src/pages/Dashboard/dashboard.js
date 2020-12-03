import React, { useContext, useEffect, useRef, useState } from 'react';
import DashboardAside from '../../components/DashboardAside';
import NavBar from '../../components/NavBar';
import DashboardRoute from './dashboardRoute';

import { Container } from './styles';

import dog from '../../assets/dog-running.gif';
import logo from '../../assets/logo.svg';

import Video from '../../assets/petscao_logo_intro.mp4';

function Dashboard() {
  const [splash, setSplash] = useState(true);
  const contentRef = useRef(null);
  const timeoutRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const fl = localStorage.getItem('PC_FL');
    setAnimate(!!fl);

    timeoutRef.current = setTimeout(
      () => {
        localStorage.removeItem('PC_FL');
        setSplash(false);
      },
      fl ? 5500 : 2000
    );

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Container showVideo={!!animate}>
      <div className={splash ? 'splash' : 'splash close'}>
        {!!animate ? (
          <video src={Video} autoPlay muted />
        ) : (
          <>
            <img src={logo} alt="logo" />
            <img src={dog} alt="dog-running" />
          </>
        )}
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
