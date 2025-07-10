import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.font.family};
    background: ${({ theme }) => theme.colors.gray};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
`;
