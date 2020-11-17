import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: calc(100% - 90px);
  padding-top: 30px;
  display: flex;
  flex-direction: column;

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

        button {
          padding: 15px 20px;
          background-color: #78cf9d;
          color: #fff;
          border-radius: 8px;
          transition: all 0.3s;

          &:hover {
            filter: brightness(0.95);
          }
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
            font-weight: 400;

            svg {
              margin-right: 10px;
            }

            &.big {
              width: 45% !important;
            }

            &.medium {
              width: 35% !important;
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

      .card-appointments {
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
