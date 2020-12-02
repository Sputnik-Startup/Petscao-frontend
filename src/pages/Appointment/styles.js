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
  .create-modal,
  .global-modal {
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
      position: relative;

      > button {
        padding: 5px;
        background-color: #f25c5c;

        position: absolute;
        top: -40px;
        right: 0;
      }

      label {
        font-size: 14px;
        margin-bottom: 10px;
      }

      .hours {
        display: flex;
        flex-direction: column;
        overflow: auto;
        max-height: 260px;

        list-style: none;
        padding: 10px;
        padding-right: 20px;

        li {
          width: 100%;
          height: 40px;
          min-height: 40px;
          background-color: #fff;
          display: flex;
          padding: 0 20px;
          align-items: center;
          border-radius: 8px;
          box-shadow: 0 0 10px 3px #00000010;
          margin-bottom: 10px;
          font-size: 14px;
          justify-content: center;

          &.not-available {
            color: #f25c5c;
          }

          &.no-hours {
            color: #b3b3b3;
            box-shadow: none;
            background-color: transparent;
          }
        }
      }
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

      h4 {
        font-size: 18px;
      }

      > span {
        color: #b3b3b3;
        font-size: 12px;
        margin-bottom: 10px;
      }

      .icons {
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        .icon {
          width: calc(100% / 3 - 10px);
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          padding: 10px;
          transition: all 0.3s;
          background-color: #f5f5f5;
          border-radius: 4px;

          &:hover {
            filter: brightness(0.9);
          }

          img {
            width: 100%;
            object-position: center;

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      form.notify-form {
        width: 100%;

        display: flex;

        .row {
          width: 100%;
          display: flex;
          margin-top: 10px;

          button {
            width: 100%;
          }
        }

        .center {
          height: 100%;
          min-height: 150px;
          margin-bottom: 10px;
          padding-bottom: 20px;
        }

        label#thumbnail {
          border: 1px dashed #ddd;
          background-size: cover;
          cursor: pointer;
          width: 30%;
          height: 100%;
          max-height: 150px;

          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 8px;
        }

        label#thumbnail input {
          display: none;
        }

        label#thumbnail.has-thumbnail {
          border: 0;
        }

        label#thumbnail.has-thumbnail img {
          display: none;
        }

        .input-password {
          display: flex;
          align-items: center;
          height: 40px;
          width: 100%;
          border-radius: 8px;

          position: relative;

          > input {
            border-radius: 8px;

            &::-ms-reveal,
            &::-ms-clear {
              display: none;
            }
          }

          svg.reveal {
            position: absolute;
            right: 15px;
          }

          > input {
            padding: 0 50px 0 10px;
          }
        }

        .column {
          width: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        label {
          font-size: 14px;
          margin-left: 10px;
          margin-bottom: 5px !important;
        }

        input,
        select {
          height: 40px;
          min-height: 40px;
          width: 100%;
          box-shadow: 0 0 10px 3px #0000000d;
          border-radius: 8px;
          padding: 0 10px;
        }

        p.error {
          font-size: 12px;
          color: #fc5656;
          margin-bottom: 10px;
          margin-left: 10px;

          &:last-child {
            margin-bottom: 0;
          }
        }
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

    .card {
      width: 170px;
      height: 170px;
      border-radius: 8px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      margin-right: 40px;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 20px 10px #00000010;
      cursor: pointer;
      transition: all 0.3s;

      svg {
        margin-bottom: 20px;
      }

      h3 {
        font-size: 16px;
        text-align: center;
      }

      &:hover {
        filter: brightness(0.95);
      }
    }

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
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

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
      width: 400px;
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
