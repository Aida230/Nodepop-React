import { useState } from "react"
import AdvertsPage from "./pages/adverts/AdvertsPage";
import LoginPage from "./pages/auth/LoginPage";

interface Props {
  defaultIsLogged: boolean;

}

function App({defaultIsLogged}: Props) {
  const [isLogged, setIsLogged] = useState(defaultIsLogged);

  const handleLogin = () => {
    setIsLogged(true)
  }

  const hadleLogout = () => {
    setIsLogged(false);
  }


  return isLogged ? (
    <AdvertsPage onLogout={hadleLogout} />
  ) : (
    <LoginPage onLogin={handleLogin}/>
  );
}

export default App;
