import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import Button from "../Button";


export default function Header() {
  const { onLogout } = useAuth();
  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };
  return (
    <header className="flex justify-between items-center bg-green-700/90 text-white px-4 py-2">
      <h1>NODEPOP ANUNCIOS</h1>
      <nav>
      <Button onClick={handleLogoutClick}>Logout</Button>
      </nav>
    </header>
  )
}