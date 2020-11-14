import { createGlobalStyle } from 'styled-components';

export const Global = createGlobalStyle`
  * {
    margin: 0;
    border: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  html, body, input, button {
    font-family: 'Roboto', Arial, Helvetica, sans-serif;
    font-weight: 500;
    color: #333;
  }

  html, body {
    font-size: 16px;
  }

  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-border-radius: 1px;
    border-radius: 1px;
    background: #b3b3b3;
  }
  ::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 0 8px 8px 0;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #ccc;
  }
`;
