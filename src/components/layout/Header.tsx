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
    <header className="flex items-center justify-between bg-white px-4 py-2 text-black">
      <img src="/image/150.png" alt="logo" className="mr-2 h-8" />
      <h1>NODEPOP ANUNCIOS</h1>
      <nav>
        <Button onClick={handleLogoutClick}>Logout</Button>
      </nav>
    </header>
  );
}
