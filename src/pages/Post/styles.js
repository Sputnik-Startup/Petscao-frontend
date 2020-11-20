import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 90px);
  padding-top: 30px;
  display: flex;
  flex-direction: column;

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

    .modal {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 550px;
      background-color: #fff;
      border-radius: 4px;
      margin-bottom: 30px;
      box-shadow: 0 0 20px 10px #00000010;

      input {
        height: 50px;
        padding: 0 10px;
      }

      .row {
        input {
          height: 50px;
          padding: 0 10px;
          width: 100%;
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
          width: 100%;
          font-size: 13px;
        }
      }

      > img {
        max-height: 350px;
        object-fit: cover;
      }

      ul.comments {
        width: 100%;
        background-color: #f5f5f5;
        border-radius: 0 0 4px 4px;
        max-height: 250px;
        overflow: auto;
        li.no-comments {
          width: 100%;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;

          span {
            font-size: 12px;
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

      justify-content: space-between;
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
        box-shadow: 0 0 20px 10px #00000010;
        cursor: pointer;

        height: 500px;
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
            overflow: hidden;
            width: 100%;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            font-size: 13px;
          }
        }

        > img {
          max-height: 350px;
          object-fit: cover;
        }
      }
    }
  }
`;
