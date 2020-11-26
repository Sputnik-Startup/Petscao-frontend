import styled from 'styled-components';

export const Container = styled.form`
  width: 100%;

  display: flex;

  .row {
    width: 100%;
    display: flex;
    margin: 0 !important;

    button {
      max-width: 20%;
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
`;
