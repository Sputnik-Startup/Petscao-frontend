import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  } to {
    opacity: 100;
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 90px);
  padding-top: 30px;
  display: flex;
  flex-direction: column;

  .delete-modal,
  .edit-modal,
  .create-modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #00000080;
    animation: ${fadeIn} 0.3s ease;

    .modal {
      width: 500px;
      border-radius: 8px;
      background-color: #f5f5f5;
      padding: 30px;
      display: flex;
      flex-direction: column;
    }

    .row {
      display: flex;
      margin-top: 20px;

      button {
        height: 40px;
        width: 100%;
        color: #fff;
        transition: all 0.3s;
        border-radius: 8px;

        &:first-child {
          margin-right: 10px;
        }

        &.yes {
          background-color: #78cf9d;
        }

        &.blue {
          background-color: #498bfc;
        }

        &:hover {
          filter: brightness(0.95);
        }
      }
    }
    form {
      display: flex;
      flex-direction: column;

      label {
        font-size: 14px;
        margin-bottom: 10px;
      }
    }

    .modal-window {
      width: 300px;
      &.w-500 {
        width: 500px !important;
      }
      &.w-900 {
        width: 70% !important;
      }
      padding: 30px;
      background-color: #f5f5f5;
      border-radius: 8px;

      display: flex;
      flex-direction: column;

      h3 {
        font-size: 22px;
        margin-bottom: 20px;
      }

      .options {
        button {
          width: 100%;
          padding: 10px;
          color: #fff;
          transition: all 0.3s;
          border-radius: 8px;

          &:first-child {
            margin-right: 10px;
          }

          &.yes {
            background-color: #78cf9d;
          }

          &.no {
            background-color: #f76457;
          }

          &:hover {
            filter: brightness(0.95);
          }
        }
      }
    }
  }
  .content {
    display: flex;
    width: 100%;
    height: 100%;
    max-height: calc(100% - 73px);
    background-color: #f5f5f5;
    padding: 40px 60px;
    margin-top: 40px;

    .list {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      margin-right: 20px;

      .title {
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;

        > div {
          display: flex;
          > button {
            padding: 15px 20px;
            background-color: #78cf9d;
            color: #fff;
            border-radius: 8px;
            transition: all 0.3s;
            margin-right: 10px;

            &:hover {
              filter: brightness(0.95);
            }
          }
        }
        > button {
          padding: 15px 20px;
          background-color: #78cf9d;
          color: #fff;
          border-radius: 8px;
          transition: all 0.3s;
          margin-right: 10px;

          &:hover {
            filter: brightness(0.95);
          }
        }

        input,
        select {
          height: 100%;
          width: 300px;
          margin-right: 20px;
          border-radius: 8px;
          padding: 0 20px;
        }
      }

      h3 {
        font-size: 30px;
      }

      label {
        display: flex;
        width: 100%;
        height: 30px;
        list-style: none;
        padding: 0 20px;
        padding-right: 30px;

        span {
          color: #b5b5b5;
          font-size: 14px;
          font-weight: 700;

          &.big {
            width: 45% !important;
          }

          &.medium {
            width: 35% !important;
          }

          &.medium-20 {
            width: 20% !important;
          }

          &.small {
            width: 10% !important;
          }
        }
      }

      ul {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: auto;
        padding-right: 10px;

        li {
          display: flex;
          width: 100%;
          align-items: center;
          background-color: #fff;
          border-radius: 8px;
          height: 60px;
          min-height: 60px;
          padding: 0 20px;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 10px;

          &:hover {
            filter: brightness(0.98);
          }

          span {
            color: #333;
            font-size: 14px;
            font-weight: 400;

            svg {
              margin-right: 10px;
            }

            &.center {
              display: flex;
              justify-content: center;
              align-items: center;
            }

            &.big {
              width: 45% !important;
            }

            &.medium {
              width: 35% !important;
            }

            &.medium-20 {
              width: 20% !important;
            }

            &.small {
              width: 10% !important;
            }
          }
        }
      }
    }

    .cards {
      width: 450px;
      height: 100%;

      .card {
        width: 100%;
        height: 100px;
        border-radius: 8px;
        color: #fff;
        padding-left: 30px;
        font-size: 16px;

        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .circle {
          width: 60px;
          height: 60px;
          margin-right: 10px;

          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
`;
