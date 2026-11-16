import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";
import AuthenticatedUserProvider from "./context/AuthenticatedUserProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthenticatedUserProvider>
        <App />
      </AuthenticatedUserProvider>
    </BrowserRouter>
  </StrictMode>,
);
