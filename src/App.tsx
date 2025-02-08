import LoginPage from "./pages/auth/LoginPage";
import AdvertsPage from "./pages/adverts/AdvertsPage";
import { useAuth } from "./pages/auth/context";


function App() {
  const { isLogged } = useAuth();

  return isLogged ? (
    <AdvertsPage  />
  ) : (
    <LoginPage />
  );
}

export default App;
