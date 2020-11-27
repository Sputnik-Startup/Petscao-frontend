import React, { useContext, useEffect, useRef, useState } from 'react';
import DashboardAside from '../../components/DashboardAside';
import NavBar from '../../components/NavBar';
import { ToastContext } from '../../context/ToastContext';
import api from '../../services/api';
import DashboardRoute from './dashboardRoute';
import socketioclient from 'socket.io-client';

import { Container } from './styles';

function Dashboard() {
  const contentRef = useRef(null);
  const [notifications, setNotifications] = useState([]);

  const { showToast } = useContext(ToastContext);

  useEffect(() => {
    const tk = localStorage.getItem('PC_TOKEN');

    (async () => {
      try {
        const response = await api({
          method: 'get',
          url: '/notifications',
          headers: {
            authorization: `Bearer ${tk}`,
          },
        });

        setNotifications(response.data);
      } catch (error) {
        showToast(error.response.data.error);
      }
    })();
  }, []);

  return (
    <Container>
      <DashboardAside contentRef={contentRef} />
      <div id="dashboard-content" ref={contentRef}>
        <NavBar notificationsProp={notifications} />
        <DashboardRoute />
      </div>
    </Container>
  );
}

export default Dashboard;
