import axios from "axios";

//la base url la cambiamos con la del api del profe, la cambiamos en el env.local
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

//client.interceptors.response.use((response) => response.data);

export const setAuthorizationHeader = (accessToken: string) => {
  client.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
};
