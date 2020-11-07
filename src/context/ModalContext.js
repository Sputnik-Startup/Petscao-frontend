import { createContext, useRef, useState } from 'react';

export const ModalContext = createContext({
  show: false,
  content: '',
  Icon: null,
});

export function ModalProvider({ children }) {
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);
  const [IconElement, setIconElement] = useState(null);
  const [time, setTime] = useState(5000);

  const timeout = useRef(null);
  const shakeTimeout = useRef(null);
  const modalRef = useRef(null);

  function showToast(content, icon = null, shownTime = 5000) {
    if (!content) {
      throw new Error('Content not provided.');
    }

    if (show) {
      shakeModal();

      resetTimeout();
      timeout.current = setTimeout(() => setShow(false), shownTime);

      return;
    }

    setContent(content);
    setIconElement(icon);
    setShow(true);
    setTime(shownTime);

    timeout.current = setTimeout(() => setShow(false), shownTime);
  }

  function hideToast() {
    resetTimeout();
    setShow(false);
  }

  function shakeModal() {
    clearTimeout(shakeTimeout.current);

    setShake(true);

    shakeTimeout.current = setTimeout(() => setShake(false), 500);
  }

  function resetTimeout() {
    clearTimeout(timeout.current);
  }

  function initTimeout() {
    timeout.current = setTimeout(() => setShow(false), time);
  }

  function Icon() {
    return <>{IconElement}</>;
  }

  return (
    <ModalContext.Provider
      value={{
        show,
        content,
        Icon,
        IconElement,
        modalRef,
        shake,
        showToast,
        hideToast,
        initTimeout,
        resetTimeout,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
