import React, { useState, useEffect, useContext } from 'react';
import { FiBell, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { Container } from './styles';
import profile from '../../assets/54994420.jfif';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../context/AuthContext';

function NavBar({ notifications }) {
  const [openNotification, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const history = useHistory();

  const { user, removeToken } = useContext(UserContext);

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
          <div className="notifications">3</div>
          <FiBell size={24} color="#fff" onClick={openNotificationWindow} />

          {openNotification && (
            <div className="notification-window">
              <div className="arrow"></div>
              <h4>Notificações</h4>
              <ul>
                <li>
                  <img src={profile} alt="notification-thumb" />
                  <div className="info">
                    <p>
                      <strong>Aniversariante</strong>hoje é aniversário de
                      Maxwell Olliver
                    </p>
                    <span>há 4 min atrás</span>
                  </div>
                </li>
                <li>
                  <img src={profile} alt="notification-thumb" />
                  <div className="info">
                    <p>
                      <strong>Aniversariante</strong>hoje é aniversário de
                      Maxwell Olliver
                    </p>
                    <span>há 4 min atrás</span>
                  </div>
                </li>
                <li>
                  <img src={profile} alt="notification-thumb" />
                  <div className="info">
                    <p>
                      <strong>Aniversariante</strong>hoje é aniversário de
                      Maxwell Olliver
                    </p>
                    <span>há 4 min atrás</span>
                  </div>
                </li>
                <li className="see-all">
                  <span>Ver todas as notificações</span>
                </li>
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
