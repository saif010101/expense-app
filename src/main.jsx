import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BtnContextProvider} from "./components/btnContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <BtnContextProvider>
        <App />
      </BtnContextProvider>
    </BrowserRouter>
  </StrictMode>
);
