import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";
import { Navigate, Routes, Route } from "react-router-dom";


function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/adverts" element={<AdvertsPage/>} />
    {/*<Route path="/adverts/:advertId" element={<AdvertPage />} /> */}
    {/*<Route path="/adverts/new" element={<NewAdvertPage/>} /> */}
    <Route path="/" element={<Navigate to="/adverts"/>} />
    <Route path="/404" element={ <div>404 | NOT FOUND </div>} />
    <Route path="*" element={<Navigate to="/404"/>} />


  </Routes>
}
export default App;
