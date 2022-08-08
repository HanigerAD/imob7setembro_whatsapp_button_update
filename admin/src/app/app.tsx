import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/global-styles";
import { Routes } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes />
    </BrowserRouter>
  );
}

export { App };
