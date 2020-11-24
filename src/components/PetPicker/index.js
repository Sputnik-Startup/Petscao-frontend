import React, { useContext, useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { UserContext } from '../../context/AuthContext';
import api from '../../services/api';

import { Container } from './styles';

function PetPicker(props) {
  const [modal, setModal] = useState(false);
  const [pets, setPets] = useState([]);

  const { token } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (props.owner) {
        const response = await api({
          method: 'get',
          url: `/company/pet?c=${props.owner}`,
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setPets(response.data);
      }
    })();
  }, [props.owner]);

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
        {props.selectedPet.name && (
          <img
            src={
              props.selectedPet?.avatar?.url ||
              'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png'
            }
            alt="profile"
          />
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
            <div className="labels">
              <span className="small">avatar</span>
              <span className="big">nome</span>
              <span classname="medium">raça</span>
            </div>
            <ul>
              {pets.map((pet) => (
                <li onClick={() => onSelect(pet)}>
                  <span className="small">
                    <img
                      src={
                        pet.avatar?.url ||
                        'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Dog-512.png'
                      }
                      alt="profile"
                    />
                  </span>
                  <span className="big">{pet.name}</span>
                  <span classname="medium">{pet.breed}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Container>
  );
}

export default PetPicker;
