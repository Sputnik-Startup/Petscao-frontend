import React, { useContext, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { UserContext } from '../../context/AuthContext';
import api from '../../services/api';

import { Container } from './styles';

function CustomerPicker(props) {
  const [modal, setModal] = useState(false);
  const [customers, setCustomers] = useState([]);

  const { token } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const response = await api({
          method: 'get',
          url: '/company/customer',
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setCustomers(response.data);
      } catch (error) {}
    })();
  }, []);

  function onSelect(customer) {
    if (customer.id === props.selectedCustomer?.id) {
      props.setSelectedCustomer(null);
      return;
    }
    setModal(false);
    props.setSelectedCustomer(customer);
  }

  async function search(e) {
    const response = await api({
      method: 'get',
      url: `/company/customer?q=${e.target.value}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setCustomers(response.data);
  }

  return (
    <Container style={props.style}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setModal(true);
        }}
        style={props.buttonStyle}
      >
        Selecionar cliente
      </button>
      <div className="selected" style={props.buttonStyle}>
        {props.selectedCustomer?.avatar && (
          <img src={props.selectedCustomer.avatar.url} alt="profile" />
        )}
        <span>
          {props.selectedCustomer?.name || 'Nenhum cliente selecionado'}
        </span>
      </div>

      {modal && (
        <div className="customer-select">
          <div className="modal-customer">
            <button className="close" onClick={() => setModal(false)}>
              <FiX color="#fff" size={16} />
            </button>
            <header>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Pesquisar"
                onChange={search}
              />
            </header>
            <div className="labels">
              <span className="small">avatar</span>
              <span className="big">nome</span>
              <span className="medium">cpf</span>
            </div>
            <ul>
              {customers.map((cust) => (
                <li
                  onClick={() => onSelect(cust)}
                  key={cust.id}
                  className={
                    props.selectedCustomer?.id === cust.id ? 'selected' : ''
                  }
                >
                  <span className="small">
                    <img src={cust.avatar.url} alt="profile" />
                  </span>
                  <span className="big">{cust.name}</span>
                  <span className="medium">{cust.cpf}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
}

export default CustomerPicker;
