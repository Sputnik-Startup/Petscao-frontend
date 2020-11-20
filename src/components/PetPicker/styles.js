import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 40px;
  margin-bottom: 20px;

  opacity: ${(props) => (props.hasCustomer ? '1' : '0.5')};

  button {
    height: 100%;
    width: 100%;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 0 20px 10px #00000010;
    margin-right: 10px;
    cursor: ${(props) => (!props.hasCustomer ? 'default' : 'pointer')};
  }

  div.selected {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    height: 100%;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 20px 10px #00000010;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 10px;
    }

    span {
      font-size: 13px;
    }
  }

  .customer-select {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #00000080;
    position: fixed;
    top: 0;
    z-index: 9999;

    .modal-customer {
      display: flex;
      flex-direction: column;
      width: 40%;
      background-color: #f9f9f9;
      padding-bottom: 20px;

      border-radius: 8px;
      max-height: 500px;
      position: relative;

      > button {
        width: 30px;
        height: 30px;
        padding: 5px;
        background-color: #f25c5c;

        position: absolute;
        top: -40px;
        right: 0;
      }

      header {
        height: 50px;
        width: 100%;
        margin-bottom: 10px;
        border-radius: 8px 8px 0 0;

        input {
          height: 100%;
          width: 100%;
          background-color: transparent;
          padding: 0 20px;
          border-radius: 8px 8px 0 0;
        }
      }

      .labels {
        display: flex;
        width: 100%;
        height: 30px;
        list-style: none;
        padding-left: 40px;
        padding-right: 20px;

        span {
          color: #b5b5b5;
          font-size: 14px;

          &.big {
            width: 45% !important;
          }

          &.medium {
            width: 35% !important;
          }

          &.small {
            width: 20% !important;
          }
        }
      }

      ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        list-style: none;
        padding: 10px 20px;
        overflow: auto;

        li {
          display: flex;
          width: 100%;
          align-items: center;
          background-color: #fff;
          border-radius: 8px;
          height: 60px;
          min-height: 60px;
          padding-left: 20px;
          cursor: pointer;
          transition: all 0.3s;
          margin-bottom: 10px;
          box-shadow: 0 0 20px 10px #00000010;

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

            &.small {
              width: 20% !important;
            }
          }

          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
          }
        }
      }
    }
  }
`;
