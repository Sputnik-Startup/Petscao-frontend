import { createContext, useRef, useState } from 'react';

export const ToastContext = createContext({
  show: false,
  content: '',
  Icon: null,
});

export function ToastProvider({ children }) {
  const [content, setContent] = useState('');
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);
  const [IconElement, setIconElement] = useState(null);
  const [time, setTime] = useState(5000);

  const timeout = useRef(null);
  const shakeTimeout = useRef(null);
  const newToastTimeout = useRef(null);
  const modalRef = useRef(null);

  function showToast(toastContent, icon = null, shownTime = 5000) {
    if (!toastContent) {
      throw new Error('Content not provided.');
    }

    if (show && toastContent === content) {
      shakeModal();

      resetTimeout();
      timeout.current = setTimeout(() => setShow(false), shownTime);

      return;
    }

    if (show && toastContent !== content) {
      clearTimeout(newToastTimeout.current);
      hideToast();

      newToastTimeout.current = setTimeout(() => {
        setContent(toastContent);
        setIconElement(icon);
        setShow(true);
        setTime(shownTime);

        timeout.current = setTimeout(() => setShow(false), shownTime);
      }, 500);

      return;
    }

    setContent(toastContent);
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
    <ToastContext.Provider
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
    </ToastContext.Provider>
  );
}
