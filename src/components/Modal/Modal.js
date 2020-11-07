import { useContext } from 'react';

import { ModalContainer } from './styles';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import { ToastContext } from '../../context/ToastContext';

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
  } = useContext(ToastContext);

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
