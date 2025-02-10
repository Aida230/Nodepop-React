import { Link } from "react-router-dom";
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
      <Link to="/">
        <img src="/image/150.png" alt="logo" className="mr-2 h-8" />
      </Link>
      <h1>NODEPOP ANUNCIOS</h1>
      <Link to="/adverts/new">New Advert</Link>
      <Link to="/adverts">Advert</Link>
      <nav>
        <Button onClick={handleLogoutClick} as={Link} to="/login">Logout</Button>
      </nav>
    </header>
  );
}
