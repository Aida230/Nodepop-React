import { Link } from "react-router-dom";
import { useAuth } from "../../pages/auth/context";
import { logout } from "../../pages/auth/service";
import Button from "../Button";
import { useState } from "react"; // Importa useState

export default function Header() {
  const { onLogout } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado para la confirmación

  const handleLogoutClick = () => {
    setShowConfirmation(true); // Muestra el mensaje de confirmación
  };

  const handleConfirmLogout = async () => {
    await logout();
    onLogout();
    setShowConfirmation(false); // Oculta el mensaje después de confirmar
  };

  const handleCancelLogout = () => {
    setShowConfirmation(false); // Oculta el mensaje si cancela
  };

  return (
    <header className="flex items-center justify-between bg-white px-4 py-2 text-black">
      <Link to="/">
        <img src="/image/150.png" alt="logo" className="mr-2 h-8" />
      </Link>
      <h1>NODEPOP ANUNCIOS</h1>
      <Link to="/adverts/new">New Advert</Link>
      <Link to="/adverts">Adverts</Link>
      <nav>
        <Button onClick={handleLogoutClick}>Logout</Button>{" "}
        {/* Botón sin "as={Link}" */}
      </nav>

      {showConfirmation && ( // Condición para mostrar el mensaje
        <div className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50">
          {" "}
          {/* Overlay oscuro */}
          <div className="rounded bg-white p-4">
            {" "}
            {/* Contenedor del mensaje */}
            <p>¿Estás seguro de que quieres cerrar sesión?</p>
            <div className="mt-2 flex justify-end">
              {" "}
              {/* Botones alineados a la derecha */}
              <button
                onClick={handleConfirmLogout}
                className="mr-2 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
              >
                Sí
              </button>{" "}
              {/* Estilos para los botones */}
              <Button
                onClick={handleCancelLogout}
                className="rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-700"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
