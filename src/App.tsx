import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate, Routes, Route, Outlet } from "react-router-dom";
//import NewAdvertPage from "./pages/adverts/NewAdvertPage";


function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/adverts" element={<Outlet/>} >
        <Route index element={<AdvertsPage />} />
        {/*<Route path=":advertId" element={<AdvertPageDetail />} /> */}
        {/*<Route path="new" element={<NewAdvertPage/>} /> */}
      </Route>

      <Route path="/" element={<Navigate to="/adverts"/>} />
      <Route path="/404" element={ <div>404 | NOT FOUND </div>} />
      <Route path="*" element={<Navigate to="/404"/>} />


  </Routes>
  );
}

export default App;
