import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

import { Container } from './styles';

function PetPicker(props) {
  const [modal, setModal] = useState(false);

  function onSelect(Pet) {
    setModal(false);
    props.setSelectedPet(Pet);
  }

  return (
    <Container hasCustomer={props.hasCustomer}>
      <button
        onClick={() => setModal(true)}
        disabled={props.hasCustomer ? false : true}
      >
        Selecionar pet
      </button>
      <div className="selected">
        {props.selectedPet.avatar_url && (
          <img src={props.selectedPet.avatar_url} alt="profile" />
        )}
        <span>
          {props.selectedPet.name
            ? props.selectedPet.name
            : !props.hasCustomer
            ? 'Primeiro selecione um cliente'
            : 'Selecione um pet'}
        </span>
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
              <span classname="medium">raça</span>
            </div>
            <ul>
              <li
                onClick={() =>
                  onSelect({
                    avatar_url:
                      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*',
                    name: 'Teddy',
                  })
                }
              >
                <span className="small">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
                    alt="profile"
                  />
                </span>
                <span className="big">Teddy</span>
                <span classname="medium">buldog</span>
              </li>
              <li
                onClick={() =>
                  onSelect({
                    avatar_url:
                      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*',
                    name: 'Teddy',
                  })
                }
              >
                <span className="small">
                  <img
                    src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*"
                    alt="profile"
                  />
                </span>
                <span className="big">Teddy</span>
                <span classname="medium">buldog</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
}

export default PetPicker;
