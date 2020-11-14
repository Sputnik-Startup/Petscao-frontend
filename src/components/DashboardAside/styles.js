import styled, { keyframes } from 'styled-components';

const rotateLeft = keyframes`
  from {

  }to {
    transform: rotate(-180deg);
  }
`;

const rotateRight = keyframes`
  from {
    transform: rotate(-180deg);
  }to {
    transform: rotate(0deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  width: ${(props) => (props.show ? '245px' : '82px')};
  min-width: ${(props) => (props.show ? '245px' : '82px')};
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #fff;
  padding: 15px;

  transition: all 0.3s;

  li {
    list-style: none;
    width: 100%;
    height: 55px;
    border-radius: 8px;
    padding: 0 15px;

    display: flex;
    align-items: center;
    margin-bottom: 5px;

    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    span {
      font-size: 14px;
      margin-left: 10px;
      color: #969696;
      display: ${(props) => (props.show ? 'block' : 'none')};
      position: absolute;
      left: 40px;
      animation: ${fadeIn} 0.7s;
    }

    &:hover {
      background-color: #f0f0f0;
    }

    &.selected {
      background-color: #e9e9e9;

      span {
        font-weight: 700;
        color: #333;
      }
    }
  }

  li.logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    cursor: default;

    &:hover {
      background-color: transparent;
    }

    svg {
      animation: ${(props) => (props.show ? rotateLeft : rotateRight)} 0.3s
        forwards;
    }

    img {
      width: 140px;
      display: ${(props) => (props.show ? 'block' : 'none')};
      animation: ${fadeIn} 0.7s;
    }
  }
`;
