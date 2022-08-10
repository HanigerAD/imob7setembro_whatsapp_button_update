import "./sb-admin-bootstrap.css";
import "react-quill/dist/quill.snow.css";
import 'react-confirm-alert/src/react-confirm-alert.css';
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  .root-layout {
    min-height: 100%;
  }

  .btn-block {
    display: block;
    width: 100%;
  }

  .btn-block + .btn-block {
    margin-top: 0.5rem;
  }
`;
