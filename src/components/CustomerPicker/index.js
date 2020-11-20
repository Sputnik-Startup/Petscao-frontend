import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import { Container } from './styles';

function CustomerPicker(props) {
  const [modal, setModal] = useState(false);

  function onSelect(customer) {
    setModal(false);
    props.setSelectedCustomer(customer);
  }

  return (
    <Container>
      <button onClick={() => setModal(true)}>Selecionar cliente</button>
      <div className="selected">
        {props.selectedCustomer.avatar_url && (
          <img src={props.selectedCustomer.avatar_url} alt="profile" />
        )}
        <span>{props.selectedCustomer.name || 'Selecione um cliente'}</span>
      </div>

      {modal && (
        <div className="customer-select">
          <div className="modal-customer">
            <button onClick={() => setModal(false)}>
              <FiX color="#fff" size={16} />
            </button>
            <header>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Pesquisar"
              />
            </header>
            <div className="labels">
              <span className="small">avatar</span>
              <span className="big">nome</span>
              <span classname="medium">cpf</span>
            </div>
            <ul>
              <li
                onClick={() =>
                  onSelect({
                    avatar_url:
                      'https://areademulher.r7.com/wp-content/uploads/2020/09/lucas-selfie-quem-e-960x540.png',
                    name: 'José Carlos',
                  })
                }
              >
                <span className="small">
                  <img
                    src="https://areademulher.r7.com/wp-content/uploads/2020/09/lucas-selfie-quem-e-960x540.png"
                    alt="profile"
                  />
                </span>
                <span className="big">José Carlos</span>
                <span classname="medium">125.256.332-33</span>
              </li>
              <li>
                <span className="small">
                  <img
                    src="https://areademulher.r7.com/wp-content/uploads/2020/09/lucas-selfie-quem-e-960x540.png"
                    alt="profile"
                  />
                </span>
                <span className="big">José Carlos</span>
                <span classname="medium">125.256.332-33</span>
              </li>
              <li>
                <span className="small">
                  <img
                    src="https://areademulher.r7.com/wp-content/uploads/2020/09/lucas-selfie-quem-e-960x540.png"
                    alt="profile"
                  />
                </span>
                <span className="big">José Carlos</span>
                <span classname="medium">125.256.332-33</span>
              </li>
              <li>
                <span className="small">
                  <img
                    src="https://areademulher.r7.com/wp-content/uploads/2020/09/lucas-selfie-quem-e-960x540.png"
                    alt="profile"
                  />
                </span>
                <span className="big">José Carlos</span>
                <span classname="medium">125.256.332-33</span>
              </li>
              <li>
                <span className="small">
                  <img
                    src="https://areademulher.r7.com/wp-content/uploads/2020/09/lucas-selfie-quem-e-960x540.png"
                    alt="profile"
                  />
                </span>
                <span className="big">José Carlos</span>
                <span classname="medium">125.256.332-33</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
}

export default CustomerPicker;
