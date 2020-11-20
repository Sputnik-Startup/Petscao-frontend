import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin-bottom: 20px;

  .calendar-modal {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #00000080;

    .modal-window {
      width: 300px;
      &.w-500 {
        width: 500px !important;
      }
      padding: 30px;
      background-color: #f5f5f5;
      border-radius: 8px;

      display: flex;
      flex-direction: column;
    }
  }
  .hour-input {
    width: 100%;
    position: relative;

    .hour-dropdown {
      position: absolute;
      width: 100%;
      height: 160px;
      list-style: none;
      top: 45px;
      background-color: #fff;
      box-shadow: 0 0 8px 3px #00000010;

      border-radius: 8px;
      overflow-y: auto;

      li {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
        background-color: #fff;

        &:first-child {
          border-radius: 8px 8px 0 0;
        }

        &:last-child {
          border-radius: 0 0 8px 8px;
        }

        &:hover {
          filter: brightness(0.9);
        }
      }
    }
  }

  input {
    width: 100%;
    height: 40px;
    margin: 0;
    background-color: #fff;
    box-shadow: 0 0 8px 3px #00000010;

    border-radius: 8px;
    padding: 0 20px;
  }
  .row {
    margin-top: 10px;
  }

  .open-calendar {
    height: 40px;
    width: 100%;
    border-radius: 8px;

    background-color: #fff;
    box-shadow: 0 0 8px 3px #00000010;
    margin-right: 10px;
  }
`;
