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

  .content {
    width: 100%;
    display: grid;
    padding-top: 40px;

    .week-appointments {
      width: 600px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #fff;
      border-radius: 8px;
      padding-top: 20px;
      box-shadow: 0 0 20px 10px #0000001a;

      > span {
        padding: 0 20px;
        font-size: 14px;
        margin-bottom: 20px;
        color: #858585;
      }

      h3 {
        padding: 0 20px;
        font-size: 25px;
        margin-bottom: 10px;
        color: #f1b71c;
      }
      ul.weekdays {
        display: flex;
        justify-content: space-around;

        li {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 30px;
          cursor: pointer;
          font-weight: 700;
          color: #b3b3b3;

          &:hover {
            filter: brightness(0.9);
          }

          &.selected {
            color: #f1b71c;
          }
        }
      }

      ul.appointments {
        width: 100%;
        transition: height 0.3s;
        padding: 20px;
        max-height: 300px;
        overflow-y: auto;

        li.no-day {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 50px;
          font-size: 14px;
          color: #b3b3b3;
        }

        li.appointment {
          display: flex;
          align-items: center;
          width: 100%;
          height: 60px;
          font-size: 14px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 2px 2px 10px 3px #00000010;

          span {
            width: calc(100% / 3);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 400;
            strong {
              margin-right: 10px;
            }
          }

          &:last-child {
            margin-bottom: 0;
          }

          margin-bottom: 10px;
        }
      }

      ul {
        li {
          list-style: none;
        }
      }
    }
  }
`;
