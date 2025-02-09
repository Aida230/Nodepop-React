import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../pages/auth/context";

const PrivateRoute = () => {
  const { isLogged } = useAuth();

  // Si no está logueado, redirigir al login
  if (!isLogged) {
    return <Navigate to="/login" />;
  }

  // Si está logueado, permitir el acceso a la ruta solicitada
  return <Outlet />;
};

export default PrivateRoute;