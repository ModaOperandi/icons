import { typography, spacing, breakpoints, text, color } from "@moda/tokens";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *,
  *:after,
  *:before {
    box-sizing: inherit;
  }

  body {
    margin: ${spacing(7)};
    padding: ${spacing(7)};
    font-size: ${typography["root-font-size"]};

    @media (max-width: ${breakpoints.md}) {
      margin: ${spacing(7, 0)};
      padding: ${spacing(7, 0)};
    }
  }

  body,
  input {
    -webkit-font-smoothing: antialiased;
    ${text("body1")}
    color: ${color("ink")};
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }

  pre {
    margin: ${spacing(6)} auto;

    &:first-child {
      margin-top: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
