import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const CustomInput = (props) => {
  const [type, setType] = useState('password');

  function setVisibility() {
    if (type === 'text') {
      setType('password');
    } else {
      setType('text');
    }
  }

  return (
    <div className="input-password" style={props.style}>
      <input type={type} name={props.name || 'password'} ref={props.register} />
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
    </div>
  );
};

export default CustomInput;
