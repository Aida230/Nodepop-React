import axios from "axios";

// La base URL la cambiamos con la del API del profe, la cambiamos en el env.local
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Esta función se usa para agregar el token al encabezado de las peticiones
export const setAuthorizationHeader = (accessToken: string) => {
  client.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
};

// Esta función elimina el encabezado de autorización una vez deslogueado
export const removeAuthorizationHeader = () => {
  delete client.defaults.headers["Authorization"];
};
