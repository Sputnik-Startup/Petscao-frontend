import React, { useState, useEffect, useContext } from 'react';
import { FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { Container } from './styles';
import profile from '../../assets/54994420.jfif';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
import { formatRelative } from 'date-fns/esm';
import { parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import api from '../../services/api';
import { ToastContext } from '../../context/ToastContext';
import socketioclient from 'socket.io-client';

function NavBar({ notificationsProp = [] }) {
  const [openNotification, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();

  const { user, removeToken, token } = useContext(UserContext);
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

  useEffect(() => {
    const tk = localStorage.getItem('PC_TOKEN');

    const socket = socketioclient('http://localhost:3333', {
      query: {
        token: tk,
      },
    });

    let _user = user;
    if (!_user?.id) {
      (async () => {
        const response = await api.get('/employee/me', {
          headers: {
            authorization: `Bearer ${tk}`,
          },
        });

        _user = response.data;
      })();
    }

    socket.on('notification', (data) => {
      console.log(data);
      const myNotification = data.notification?.find(
        (noti) => noti.to === _user.id
      );

      setNotifications((state) => [myNotification, ...state]);
    });
  }, []);

  useEffect(() => {
    let clpNotificationRef = document.querySelector('.bell');
    let clpProfileRef = document.querySelector('.profile');

    document.addEventListener('click', (e) => {
      if (clpNotificationRef && !clpNotificationRef.contains(e.target)) {
        setOpenNotifications(false);
      }
      if (clpProfileRef && !clpProfileRef.contains(e.target)) {
        setOpenProfile(false);
      }
    });

    return () => {
      let clpNotificationRef = document.querySelector('.bell');
      let clpProfileRef = document.querySelector('.profile');

      document.removeEventListener('click', (e) => {
        if (clpNotificationRef && !clpNotificationRef.contains(e.target)) {
          setOpenNotifications(false);
        }

        if (clpProfileRef && !clpProfileRef.contains(e.target)) {
          setOpenProfile(false);
        }
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openNotificationWindow() {
    if (openNotification) {
      setOpenNotifications(false);
    } else {
      api({
        method: 'put',
        url: '/notifications',
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setNotifications((state) =>
        state.map((noti) => {
          if (!noti.read) {
            noti.read = true;
          }
          return noti;
        })
      );
      setOpenNotifications(true);
    }
  }

  function openProfileWindow() {
    if (openProfile) {
      setOpenProfile(false);
    } else {
      setOpenProfile(true);
    }
  }

  return (
    <Container>
      <div className="input">
        <FiSearch size={24} color="#992400" />
        <input type="text" name="search" id="search" placeholder="Buscar" />
      </div>
      <div className="nav-actions">
        <div className="bell">
          {notifications[0] && notifications.find((noti) => !noti?.read) && (
            <div className="notifications">
              {notifications.filter((noti) => noti?.read === false).length}
            </div>
          )}

          <FiBell size={24} color="#fff" onClick={openNotificationWindow} />

          {openNotification && (
            <div className="notification-window">
              <div className="arrow"></div>
              <h4>Notificações</h4>
              <ul>
                {!notifications[0] && (
                  <li className="no-notifications">Nenhuma notificação</li>
                )}
                {notifications.map((noti) => (
                  <li key={noti.id}>
                    <img src={noti.midia} alt="notification-thumb" />
                    <div className="info">
                      <p>
                        <strong>{noti.title}</strong>
                        {noti.content}
                      </p>
                      <span>
                        {formatRelative(parseISO(noti.createdAt), new Date(), {
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="profile">
          <button onClick={openProfileWindow}>
            <img src={user?.avatar?.url || ''} alt="profile" />
            <span>{user?.name || ''}</span>
          </button>

          {openProfile && (
            <div className="profile-dropdown">
              {/* <li>
                <FiUser size={18} color="#639fff" />
                <span>Meu perfil</span>
              </li> */}
              <li
                onClick={() => {
                  removeToken();
                  history.push('/');
                }}
              >
                <FiLogOut size={18} color="#f26d6d" />
                <span>Sair</span>
              </li>
              <div className="arrow"></div>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}

export default NavBar;
