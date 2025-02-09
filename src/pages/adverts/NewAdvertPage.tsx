import { NavLink } from "react-router-dom";
import Button from "../../components/Button";
import NewAdvertForm from "../../components/NewAdvertForm";
import { useNewAdvertForm } from "./useNewAdvertForm";

const NewAdvertPage = () => {
  const {
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
  } = useNewAdvertForm();

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Navegación entre páginas */}
      <nav className="mb-4 flex gap-4">
        <NavLink to="/adverts" className="text-green-500">
          Adverts
        </NavLink>
        <NavLink to="/adverts/new" className="text-green-500">
          New Advert
        </NavLink>
      </nav>

      <h2 className="text-2xl font-bold mb-4">Create New Advert</h2>

      {/* Renderizamos el formulario y le pasamos los valores del hook */}
      <NewAdvertForm
        name={name}
        setName={setName}
        saleType={saleType}
        setSaleType={setSaleType}
        tag={tag}
        setTag={setTag}
        price={price}
        setPrice={setPrice}
        photo={photo}
        setPhoto={setPhoto}
        error={error}
        handleSubmit={handleSubmit}
      />

      {/* Botón para cerrar sesión */}
      <Button onClick={handleLogout} className="mt-4 w-full p-2 rounded">
        Logout
      </Button>
    </div>
  );
};

export default NewAdvertPage;