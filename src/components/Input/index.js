import React, { useState } from 'react';
import { FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

import { Container } from './styles';

const Input = React.forwardRef((props, ref) => {
  const [type, setType] = useState(props.type || 'password');

  function setVisibility() {
    if (type === 'text') {
      setType('password');
    } else {
      setType('text');
    }
  }

  return (
    <>
      <Container>
        {props.icon || (
          <FiLock color="#172B4D" size={22} style={{ width: '10%' }} />
        )}
        <input
          type={type}
          placeholder={props.placeholder || 'Senha'}
          ref={ref}
          value={props.value}
          onChange={props.onChange}
        />
        {props.type !== 'text' &&
          (type === 'text' ? (
            <FiEyeOff
              className="reveal"
              color="#172B4D"
              size={15}
              onClick={setVisibility}
            ></FiEyeOff>
          ) : (
            <FiEye
              className="reveal"
              color="#172B4D"
              size={15}
              onClick={setVisibility}
            ></FiEye>
          ))}
      </Container>
    </>
  );
});

export default Input;
