import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;

  .input {
    display: flex;
    align-items: center;
    padding-left: 18px;
    width: 500px;
    background-color: #fff;
    height: 50px;
    border-radius: 25px;
    box-shadow: 2px 2px 3px 2px #0000001a;

    input {
      height: 50px;
      width: 100%;
      border-radius: 0 25px 25px 0;
      padding: 0 15px;
      font-size: 14px;

      &::placeholder {
        color: #99240080;
      }
    }
  }

  .nav-actions {
    height: 100%;
    display: flex;
    align-items: center;

    .bell {
      margin-right: 40px;
      position: relative;
      cursor: pointer;

      .notifications {
        width: 15px;
        height: 15px;
        border-radius: 50%50%;
        background-color: #ff5252;
        position: absolute;
        top: -5px;
        right: -5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        color: #fff;
        pointer-events: none;
      }

      .notification-window {
        width: 500px;
        display: flex;
        flex-direction: column;

        background-color: #fff;
        position: absolute;
        left: -450px;
        top: 50px;

        border-radius: 8px;
        box-shadow: 0 0 20px 10px #0000000a;
        z-index: 99999;

        .arrow {
          position: absolute;

          width: 15px;
          height: 15px;
          background: #fff;
          border-radius: 4px;

          transform: rotate(45deg);
          top: -6.5px;
          right: 30px;
        }

        h4 {
          display: flex;
          align-items: center;
          height: 60px;
          padding: 0 40px;
          font-weight: 500;
          cursor: default;
        }

        ul {
          border-radius: 0 0 8px 8px;
          max-height: 300px;
          overflow: auto;

          li {
            list-style: none;
            display: flex;
            align-items: center;
            height: 60px;
            min-height: 60px;
            padding: 0 40px;
            background-color: #ededed;
            cursor: pointer;
            transition: all 0.3s;

            &.no-notifications {
              justify-content: center;
              color: #b3b3b3;
              font-weight: 400;
              font-size: 14px;
              background-color: #fff;
              cursor: default;

              &:hover {
                filter: brightness(1);
              }
            }

            &:hover {
              filter: brightness(0.95);
            }

            &:nth-child(2n) {
              background-color: #fff;
            }

            &:last-child {
              border-radius: 0 0 8px 8px;
            }

            &.see-all {
              justify-content: center;
              cursor: default;

              &:hover {
                filter: brightness(1);
              }

              span {
                cursor: pointer;
                font-size: 12px;
                color: #992400;

                transition: all 0.3s;

                &:hover {
                  filter: brightness(1.2);
                }
              }
            }

            .info {
              p {
                font-size: 14px;
                color: #919191;

                strong {
                  color: #6b6b6b;
                  &::after {
                    content: ' ';
                  }
                }
              }

              span {
                font-size: 12px;
                color: #b3b3b3;
              }
            }

            img {
              width: 45px;
              height: 45px;
              border-radius: 50%;
              object-fit: cover;
              margin-right: 20px;
            }
          }
        }
      }
    }

    .profile {
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;

      button {
        display: flex;
        align-items: center;
        background-color: transparent;
        cursor: pointer;
        img {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 15px;
        }

        span {
          color: #fff;
          font-size: 14px;
        }
      }

      .profile-dropdown {
        box-shadow: 0 0 20px 10px #0000000a;
        width: 150px;
        background-color: #fff;
        border-radius: 8px;

        position: absolute;
        left: 0;
        top: 80px;

        .arrow {
          position: absolute;

          width: 15px;
          height: 15px;
          background: #fff;
          border-radius: 4px;

          transform: rotate(45deg);
          top: -6.5px;
          right: calc(50% - 7.5px);
          transition: all 0.3s;
        }

        li {
          list-style: none;
          display: flex;
          align-items: center;
          height: 40px;
          cursor: pointer;
          padding-left: 20px;
          transition: all 0.3s;

          background-color: #fff;

          border-radius: 8px 8px 0 0;

          svg {
            margin-right: 5px;
          }

          &:first-child:hover ~ div.arrow {
            filter: brightness(0.9);
          }

          span {
            font-size: 12px;
            color: #333;
          }
          &:first-child:hover + .arrow {
            filter: brightness(0.9);
          }
          &:hover {
            filter: brightness(0.9);
          }

          &:nth-child(2) {
            border-radius: 0 0 8px 8px;
          }
        }
      }
    }
  }
`;
