import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useNewAdvertForm() {
  // Estados del formulario
  const [name, setName] = useState("");
  const [saleType, setSaleType] = useState("buy");
  const [tag, setTag] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook para redireccionar

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que todos los campos obligatorios estén llenos
    if (!name || !saleType || !tag || !price) {
      setError("All fields (except the photo) are required.");
      return;
    }

    // Redirigir a la página del anuncio recién creado
    navigate(`/adverts/${name.replace(/\s+/g, "-").toLowerCase()}`);
  };

  // Función para manejar el logout del usuario
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      console.log("User has logged out");
      navigate("/login");
    }
  };

  return {
    name,
    setName,
    saleType,
    setSaleType,
    tag,
    setTag,
    price,
    setPrice,
    photo,
    setPhoto,
    error,
    handleSubmit,
    handleLogout,
  };
}