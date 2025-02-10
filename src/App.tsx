import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate, Routes, Route } from "react-router-dom";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";
import PrivateRoute from "./components/PrivateRoute";  // Importamos el PrivateRoute


function App() {
  return (
    <Routes>
      {/* Ruta pública de login */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Ruta privada para los anuncios */}
      <Route path="/adverts" element={<PrivateRoute />}>
        <Route index element={<AdvertsPage />} />
        <Route path="new" element={<NewAdvertPage />} />
      </Route>

      {/* Redirección predeterminada */}
      <Route path="/" element={<Navigate to="/adverts" />} />

      {/* Ruta 404 */}
      <Route path="/404" element={<div>404 | NOT FOUND</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
{/*<Route path=":advertId" element={<AdvertPageDetail />} /> */}