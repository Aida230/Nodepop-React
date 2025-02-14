import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate, Routes, Route } from "react-router-dom";
import NewAdvertPage from "./pages/adverts/NewAdvertPage";
import PrivateRoute from "./components/PrivateRoute";  // Importamos el PrivateRoute
import AdvertPageDetail from "./pages/adverts/AdvertPageDetail";
import Error404 from "./components/Error";


function App() {
  return (
    <Routes>
      {/* Ruta pública de login */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Ruta privada para los anuncios */}
      <Route path="/adverts" element={<PrivateRoute />}>
        <Route index element={<AdvertsPage />} />
        <Route path="new" element={<NewAdvertPage />} />
        <Route path="/adverts/:id" element={<AdvertPageDetail />} />
      </Route>

      {/* Redirección predeterminada */}
      <Route path="/" element={<Navigate to="/adverts" />} />

      {/* Ruta 404 */}
      <Route path="/404" element={<Error404 />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;