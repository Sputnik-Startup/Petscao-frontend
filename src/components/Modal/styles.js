import styled, { keyframes } from 'styled-components';

const show = keyframes`
  from {
    display: flex;
    opacity: 0;
    margin-left: -100px;
  } to {
    display: flex;
    margin-left: 0px;
  }
`;

const hide = keyframes`
  from {

  } to {
    opacity: 0;
    margin-left: -100px;
  }
`;

const setDisplayNone = keyframes`
  from {

  } to {
    visibility: hidden;
    pointer-events: none;
  }
`;

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;

  position: relative;
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  width: 400px;
  height: 80px;

  background-color: #fff;

  position: absolute;
  bottom: 50px;
  left: 30px;

  border-radius: 4px;
  box-shadow: 0 0 20px 10px #00000010;

  animation: ${(props) => (props.show ? show : hide)} forwards 0.5s ease,
    ${(props) => props.shake && shake} 0.5s,
    ${(props) => !props.show && setDisplayNone} 0.1s 0.6s forwards;
  opacity: 100;
  transition: all 0.3s;

  z-index: 9999;

  &.shake {
    animation: ${shake} 0.5s;
  }

  svg {
    margin-right: 10px;

    &:last-child {
      position: absolute;
      top: 10px;
      right: 0;

      cursor: pointer;
    }
  }

  p {
    font-size: 16px;
    color: #333;
    pointer-events: none;
  }
`;
