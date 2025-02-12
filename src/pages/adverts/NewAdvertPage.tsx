import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdvert } from "./service";
import { AdvertContent } from "./types";
import Layout from "../../components/layout/Layout";
import Button from "../../components/Button";

// Lista de tags disponibles
const availableTags = ["lifestyle", "motor", "mobile", "work"];

const CreateAdvert: React.FC = () => {
  const [advert, setAdvert] = useState<AdvertContent>({
    name: "",
    price: 0,
    sale: true,
    tags: [],
    photo: null, // ✅ photo ahora es un File | null
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [preview, setPreview] = useState<string | null>(null); // ✅ Estado para previsualizar la imagen
  const navigate = useNavigate();

  // Maneja cambios en inputs de texto y select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setAdvert((prev) => ({
      ...prev,
      [name]:
        name === "price" ? Number(value) : name === "sale" ? value === "true" : value, // ✅ Convertimos price a número y sale a booleano
    }));
  };

  // Maneja selección de tags con checkboxes
  const handleTagChange = (tag: string) => {
    setAdvert((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  // Maneja la carga de imagen
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      setAdvert((prev) => ({ ...prev, photo: file })); // ✅ Guardamos el archivo
      setPreview(URL.createObjectURL(file)); // ✅ Generamos una URL de previsualización
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!advert.name) newErrors.name = "El nombre es obligatorio";
    if (advert.price <= 0) newErrors.price = "El precio debe ser mayor a 0";
    if (advert.tags.length === 0) newErrors.tags = "Debes seleccionar al menos un tag";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejo del envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Datos que se van a enviar:", advert);

    try {
      const newAdvert = await createAdvert(advert);
      navigate(`/adverts/${newAdvert.id}`);
    } catch (error) {
      console.error("Error al crear el anuncio:", error);
    }
  };

  return (
    <Layout>
    <div className="max-w-sm mx-auto mt-4 p-3 bg-white shadow-sm rounded-md">
      <h2 className="text-xl font-bold mb-4 text-center">Crear Anuncio</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Nombre */}
        <div>
          <label className="block text-sm font-medium">Nombre:</label>
          <input
            type="text"
            required
            name="name"
            value={advert.name}
            onChange={handleChange}
            className="w-full border rounded-md p-1.5 mt-1 text-sm"
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm font-medium">Precio:</label>
          <input
            type="number"
            required
            name="price"
            value={advert.price}
            onChange={handleChange}
            className="w-full border rounded-md p-1.5 mt-1 text-sm"
          />
          {errors.price && <p className="text-red-500 text-xs">{errors.price}</p>}
        </div>

        {/* Compra/Venta */}
        <div>
          <label className="block text-sm font-medium">Compra / Venta:</label>
          <select
            name="sale"
            required
            value={advert.sale ? "true" : "false"}
            onChange={handleChange}
            className="w-full border rounded-md p-1.5 mt-1 text-sm"
          >
            <option value="true">Venta</option>
            <option value="false">Compra</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium mb-1">Tags:</label>
          <div className="flex flex-wrap gap-1">
            {availableTags.map((tag) => (
              <label key={tag} className="flex items-center space-x-1 text-xs">
                <input
                  type="checkbox"
                  required
                  checked={advert.tags.includes(tag)}
                  onChange={() => handleTagChange(tag)}
                  className="w-3 h-3"
                />
                <span className="capitalize">{tag}</span>
              </label>
            ))}
          </div>
          {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
        </div>

        {/* Foto */}
        <div>
          <label className="block text-sm font-medium">Foto:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border rounded-md p-1.5 mt-1 text-sm"
          />
          {preview && (
            <img
              src={preview}
              alt="Previsualización"
              className="mt-2 w-24 h-24 object-cover rounded-md"
            />
          )}
        </div>

        {/* Botón de Enviar */}
        <Button
          type="submit"
          className="w-full text-white font-bold py-2 px-3 rounded-md bg-blue-500 hover:bg-blue-600 text-sm"
        >
          Crear Anuncio
        </Button>
      </form>
    </div>
    </Layout>
  );
};

export default CreateAdvert;
