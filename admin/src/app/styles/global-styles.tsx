import "./sb-admin-bootstrap.css";
import "react-quill/dist/quill.snow.css";
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  .root-layout {
    min-height: 100%;
  }
`;
