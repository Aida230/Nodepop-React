import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import storage from "./utils/storage";
import { setAuthorizationHeader } from "./api/client";
import { AuthProvider } from "./pages/auth/context.tsx";
import { BrowserRouter } from "react-router-dom";

// Recuperamos el token de autenticación del localStorage
const accessToken = storage.get("auth");
if (accessToken) {
  setAuthorizationHeader(accessToken); // Si existe el token, lo usamos en las cabeceras de la API
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider defaultIsLogged={!!accessToken}>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
