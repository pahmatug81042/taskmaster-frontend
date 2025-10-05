import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "./contexts/AppProviders";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AppProviders>
    </BrowserRouter>
  </StrictMode>
);