import {
  client,
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from "../../api/client";
import storage from "../../utils/storage";
import type { Credentials, Login } from "./types";

export const login = async (credentials: Credentials) => {
  const response = await client.post<Login>("api/auth/login", credentials);
  const { accessToken } = response.data;
  storage.set("auth", accessToken);
  setAuthorizationHeader(accessToken);
  return response;
};

export const logout = async () => {
  storage.remove("auth");
  removeAuthorizationHeader();
};

//cuando lo conecte al api del profe tengo que cambiar el
//                          ('/api/auth/login creo')
