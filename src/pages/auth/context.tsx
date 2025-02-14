import {
  createContext,
  type ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import storage from "../../utils/storage";
import {
  setAuthorizationHeader,
  removeAuthorizationHeader,
} from "../../api/client";

interface AuthContextValue {
  isLogged: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  isLogged: false,
  onLogin: () => {},
  onLogout: () => {},
});

interface Props {
  defaultIsLogged: boolean;
  children: ReactNode;
}

export function AuthProvider({ defaultIsLogged, children }: Props) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  useEffect(() => {
    // Verificamos si hay un token almacenado en el localStorage
    const token = storage.get("auth");
    if (token) {
      setIsLogged(true);
      setAuthorizationHeader(token); // Establecemos el token en las cabeceras de las peticiones
    } else {
      setIsLogged(false);
    }
  }, []); // Solo se ejecuta al montar el componente

  const handleLogin = () => {
    setIsLogged(true);
    const token = storage.get("auth");
    if (token) {
      setAuthorizationHeader(token); // Establecemos el token al iniciar sesión
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    storage.remove("auth"); // Limpiamos el token del localStorage
    removeAuthorizationHeader(); // Eliminamos el token de las cabeceras de las peticiones
  };

  const authValue = {
    isLogged,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

// Custome hook
export function useAuth() {
  const authValue = useContext(AuthContext);
  return authValue;
}
