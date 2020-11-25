import React, { useState, useEffect, useContext } from 'react';
import { FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { Container } from './styles';
import profile from '../../assets/54994420.jfif';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';
import { formatRelative } from 'date-fns/esm';
import { parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function NavBar({ notificationsProp = [] }) {
  const [openNotification, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const history = useHistory();

  const { user, removeToken } = useContext(UserContext);

  useEffect(() => setNotifications(notificationsProp), [notificationsProp]);

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
          {notifications[0] && notifications.find((noti) => !noti.read) && (
            <div className="notifications">
              {notifications.filter((noti) => noti.read === false).length}
            </div>
          )}

          <FiBell size={24} color="#fff" onClick={openNotificationWindow} />

          {openNotification && (
            <div className="notification-window">
              <div className="arrow"></div>
              <h4>Notificações</h4>
              <ul>
                {notifications[0] &&
                  notifications.map((noti) => (
                    <li>
                      <img src={profile} alt="notification-thumb" />
                      <div className="info">
                        <p>
                          <strong>{noti.title}</strong>
                          {noti.content}
                        </p>
                        <span>
                          {formatRelative(
                            parseISO(noti.createdAt),
                            new Date(),
                            { locale: ptBR }
                          )}
                        </span>
                      </div>
                    </li>
                  ))}
                {notifications[0] ? (
                  <li className="see-all">
                    <span>Ver todas as notificações</span>
                  </li>
                ) : (
                  <li className="no-notifications">
                    <span>Nenhuma notificação</span>
                  </li>
                )}
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
              <li>
                <FiUser size={18} color="#639fff" />
                <span>Meu perfil</span>
              </li>
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
