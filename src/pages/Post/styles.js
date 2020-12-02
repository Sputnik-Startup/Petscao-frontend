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

    label#thumbnail {
      display: flex;
      flex-direction: column;
      border: 1px dashed #b3b3b3;
      background-size: cover;
      cursor: pointer;
      width: 30%;
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
      margin-bottom: 20px;
      margin-left: 0 !important;

      h3 {
        margin-top: 20px;
        color: #b1b1b1;
      }
    }

    label#thumbnail input {
      display: none;
    }

    label#thumbnail.has-thumbnail {
      border: 0;

      img {
        display: none;
      }

      h3 {
        display: none;
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

    .modal {
      width: 500px;
      border-radius: 8px;
      background-color: #f5f5f5;
      padding: 30px;
      display: flex;
      flex-direction: column;
      height: 50%;

      label {
        font-size: 14px;
        margin-left: 10px;
        margin-bottom: 5px !important;
      }

      > input {
        height: 40px;
        min-height: 40px;
        width: 100%;
        box-shadow: 0 0 10px 3px #0000000d;
        border-radius: 8px;
        padding: 0 10px;
        margin-bottom: 20px;
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
  }

  .post-modal {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: #00000080;
    align-items: center;
    justify-content: center;
    animation: ${fadeIn} 0.3s ease;

    .modal {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 550px;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 0 20px 10px #00000010;

      input {
        height: 50px;
        padding: 0 10px;
      }

      .row {
        display: flex;
        position: relative;
        input {
          height: 50px;
          padding: 0 10px;
          width: 100%;
        }
        .mark-profile {
          width: 60%;
          position: absolute;
          max-height: 170px;
          bottom: 60px;
          left: 0;
          border: 1px solid #ddd;
          box-shadow: 0 0 10px 3px #00000010;
          border-radius: 4px;
          margin-left: 10px;

          ul {
            max-height: 140px;
            li {
              transition: all 0.3s;
              cursor: pointer;
              &:hover {
                filter: brightness(0.92);
              }
            }
          }
        }

        button {
          padding: 0 10px;
          border-radius: 0 0 4px 0;
          color: #fff;
          background-color: #039cd8;
          transition: all 0.3s;

          &:hover {
            filter: brightness(0.95);
          }
        }
      }

      > button {
        padding: 5px;
        background-color: #f25c5c;

        position: absolute;
        top: -40px;
        right: 0;
      }

      header {
        display: flex;
        align-items: center;

        width: 100%;
        height: 60px;
        min-height: 60px;
        padding: 0 20px;

        img.profile {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 10px;
        }

        .column {
          display: flex;
          flex-direction: column;
          h3 {
            font-size: 13px;
          }

          span {
            font-size: 11px;
            color: #a1a1a1;
          }
        }
      }

      footer {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;

        .reactions {
          width: 100%;
          display: flex;
          margin-bottom: 5px;

          svg {
            margin-right: 5px;
          }

          span {
            font-size: 13px;
            margin-right: 15px;
            color: #7d7d7d;
          }
        }
        > span {
          font-size: 13px;
          white-space: wrap;
          word-break: break-all;
        }
      }

      > img {
        width: 100%;
        max-height: 50vh;
        object-fit: contain;
      }

      ul.comments {
        width: 100%;
        background-color: #f5f5f5;
        border-radius: 0 0 4px 4px;
        max-height: 200px;
        overflow: auto;

        li.no-comments {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;

          span {
            font-size: 12px;
            font-weight: 700;
            color: #b3b3b3;
          }
        }

        li.comment {
          height: 70px;
          width: 100%;

          display: flex;
          list-style: none;
          align-items: center;
          background: #fff;
          padding: 0 30px;
          position: relative;

          > svg {
            position: absolute;
            right: 10px;
            top: 20px;
            cursor: pointer;
          }

          img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
          }

          .text {
            font-size: 12px;

            h3 {
              font-size: 13px;
            }

            .reply {
              display: flex;
              margin-top: 5px;

              span {
                font-weight: 700;
                color: #9e9e9e;
                margin-right: 10px;
                cursor: pointer;

                &:hover {
                  filter: brightness(0.9);
                }
              }
            }
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
    padding: 0 40px;
    margin-top: 20px;
    flex-direction: column;

    > button {
      width: 200px;
      padding: 15px 10px;
      background-color: #fff;
      border-radius: 8px;
      margin-bottom: 20px;
      transition: all 0.3s;

      &:hover {
        filter: brightness(0.9);
      }
    }

    ul.posts {
      width: 100%;
      display: flex;
      overflow: auto;
      flex-wrap: wrap;

      padding-right: 10px;

      li {
        display: flex;
        flex-direction: column;
        width: calc(100% / 3 - 30px);
        background-color: #fff;
        border-radius: 4px;
        margin-bottom: 30px;
        margin-right: 30px;
        box-shadow: 0 0 20px 10px #00000010;

        height: 500px;
        max-height: 500px;

        &:last-child {
          margin-right: 0;
        }

        header {
          display: flex;
          align-items: center;

          width: 100%;
          height: 60px;
          min-height: 60px;
          padding: 0 20px;
          position: relative;

          svg {
            position: absolute;
            top: 20px;
            right: 20px;
            cursor: pointer;

            &:hover {
              filter: brightness(0.9);
            }
          }

          img.profile {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
          }

          .column {
            display: flex;
            flex-direction: column;
            h3 {
              font-size: 13px;
            }

            span {
              font-size: 11px;
              color: #a1a1a1;
            }
          }
        }

        footer {
          display: flex;
          flex-direction: column;
          padding: 10px 20px;

          .reactions {
            width: 100%;
            display: flex;
            margin-bottom: 5px;

            svg {
              margin-right: 5px;
            }

            span {
              font-size: 13px;
              margin-right: 15px;
              color: #7d7d7d;
            }
          }
          > span {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          > p {
            font-size: 12px;
            margin-top: 10px;
            color: #b3b3b3;
            cursor: pointer;
            width: 200px;

            &:hover {
              filter: brightness(0.9);
            }
          }

          > span {
            overflow: hidden;
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            font-size: 13px;
          }
        }

        > img {
          height: 100%;
          max-height: 350px;
          object-fit: cover;
        }
      }
    }
  }
`;
