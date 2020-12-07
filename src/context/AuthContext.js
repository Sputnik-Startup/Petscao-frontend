import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import api from '../services/api';
import { ToastContext } from './ToastContext';

export const UserContext = createContext({
  user: '',
  token: '',
  handleSignIn: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  const { showToast } = useContext(ToastContext);

  async function handleSignIn(username, password, history) {
    if (username && password) {
      try {
        const response = await api({
          method: 'post',
          url: '/company/session',
          data: {
            username,
            password,
          },
        });

        setUser(response.data.user);
        _setToken(response.data.token);

        localStorage.setItem('PC_FL', true);
        history.push('/dashboard');
      } catch (err) {
        showToast(err.response?.data.error || 'Erro');
      }
    }
  }

  function _setToken(tk) {
    localStorage.setItem('PC_TOKEN', tk);

    setToken(tk);
  }

  function removeToken() {
    localStorage.removeItem('PC_TOKEN');

    setToken('');
  }

  useEffect(() => {
    setToken(localStorage.getItem('PC_TOKEN'));
    if (!user.name && token) {
      (async () => {
        const response = await api.get('/employee/me', {
          headers: {
            authorization: `Bearer ${localStorage.getItem('PC_TOKEN')}`,
          },
        });

        setUser(response.data);
      })();
    }
  }, [token]);

  useLayoutEffect(() => {
    const tk = localStorage.getItem('PC_TOKEN');

    if (tk) {
      setToken(tk);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        handleSignIn,
        setUser,
        _setToken,
        removeToken,
        token,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
