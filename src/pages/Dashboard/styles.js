import styled from 'styled-components';
import bg from '../../assets/dashboard.png';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ededed;

  display: flex;

  div#dashboard-content {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;

    background: url(${bg}) no-repeat top;
    background-size: contain;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;
`;
