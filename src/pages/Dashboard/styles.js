import styled, { keyframes } from 'styled-components';
import bg from '../../assets/dashboard.png';

const animation = keyframes`
  from {
    margin: 0;
  } to {
    margin-left: -100%;
  }
`;

const setDisplayNone = keyframes`
  from {

  } to {
    visibility: hidden;
    pointer-events: none;
  }
`;

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

  .splash {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: ${(props) => (props.showVideo ? '#fcfcfc' : '#fff')};
    overflow: hidden;

    video {
      display: flex;
      width: 60%;
      height: 60%;
    }

    &.close {
      animation: ${animation} 2s ease forwards,
        ${setDisplayNone} 0.1s 1.9s forwards;
    }

    img[alt='dog-running'] {
      width: 300px;
    }
    img[alt='logo'] {
      width: 250px;
      position: absolute;
      top: 60px;
      left: calc(50% - 125px);
    }

    z-index: 999999;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 40px;
  display: flex;
  flex-direction: column;

  .content {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: 600px 1fr;
    grid-template-rows: 417px 1fr;
    gap: 20px;
    padding-top: 40px;

    .logo {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 50%;
      }
    }

    .week-appointments {
      min-width: 600px;
      width: 40%;
      min-height: 217px;
      max-height: 417px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background-color: #fff;
      border-radius: 8px;
      padding-top: 20px;
      box-shadow: 0 0 20px 10px #00000010;
      transition: height 0.3s;

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
          padding: 0 10px;

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

    .last-appointment {
      min-width: 600px;
      width: 40%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      background-color: #fff;
      border-radius: 8px;
      padding-top: 20px;
      box-shadow: 0 0 20px 10px #00000010;

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

      .no-rtapp {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        h3 {
          color: #b3b3b3;
          font-size: 16px;
        }
      }

      .appointment {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 0 30px;

        .column {
          height: 100%;
          width: calc(100% / 3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          img {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 10px;
            &.not-rounded {
              border-radius: 0;
            }
          }

          span {
            font-size: 14px;
          }
        }
      }
    }
  }
`;
