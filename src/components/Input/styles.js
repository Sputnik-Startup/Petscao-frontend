import styled from 'styled-components';

export const Container = styled.div`
  height: 47px;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: center;
  padding-left: 10px;
  border-radius: 4px;
  box-shadow: 0 3px 5px -2px #35353542;
  transition: all 0.3s;
  margin-bottom: 20px;

  position: relative;

  input {
    height: 100%;
    width: 90%;
    padding-left: 10px;
    font-size: 15px;
    border: 0;
    border-radius: 0 4px 4px 0px;

    &::placeholder {
      color: rgb(153, 153, 153);
    }

    &::-ms-reveal,
    &::-ms-clear {
      display: none;
    }
  }

  svg.reveal {
    position: absolute;
    right: 15px;
  }

  input {
    padding: 0 50px 0 10px;
  }
`;
