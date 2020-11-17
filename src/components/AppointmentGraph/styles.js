import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: #fff;
  border-radius: 8px;
  padding-top: 20px;
  box-shadow: 0 0 20px 10px #0000001a;
  min-height: 300px;
  height: 300px;

  .header {
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
  }

  .graph {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;

    ul.graph-data {
      border: 1px dashed #b3b3b3;
      border-right: 0px;
      border-top: 0px;
      width: 100%;
      height: 100%;
      list-style: none;
      display: flex;
      align-items: flex-end;
      position: relative;

      h6 {
        position: absolute;
        top: 0px;
        right: 10px;
      }

      li.data {
        flex-direction: column;
        width: calc(100% / 12);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 10px;

        span {
          height: 20px;
          font-size: 14px;
          color: #039cd8;
        }

        div {
          width: 100%;
          background-color: #039cd8;
        }
      }
    }

    ul.months {
      padding: 10px 0;
      width: 100%;
      display: flex;
      list-style: none;

      li {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        width: calc(100% / 12);
        margin: 0 20px;
      }
    }
  }
`;
