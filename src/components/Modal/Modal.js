import { useContext } from 'react';

import { ModalContainer } from './styles';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import { ModalContext } from '../../context/ModalContext';

function Modal() {
  const {
    hideToast,
    content,
    Icon,
    IconElement,
    show,
    modalRef,
    shake,
    resetTimeout,
    initTimeout,
  } = useContext(ModalContext);

  return (
    <ModalContainer
      show={show}
      ref={modalRef}
      shake={shake}
      onMouseEnter={resetTimeout}
      onMouseLeave={show ? initTimeout : null}
    >
      {IconElement ? <Icon /> : <FiAlertCircle color="#ff4133" size={35} />}
      <p>{content}</p>

      <FiX color="#333" size={16} onClick={hideToast} />
    </ModalContainer>
  );
}

export default Modal;
