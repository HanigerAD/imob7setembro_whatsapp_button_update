import { BrowserRouter } from "react-router-dom";
import { GlobalStyles } from "./styles/global-styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "./routes/routes";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <GlobalStyles />
      <Routes />
    </BrowserRouter>
  );
}

export { App };

