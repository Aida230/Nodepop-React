import { createContext, type ReactNode, useContext, useState } from "react";

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

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    setIsLogged(false);
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
