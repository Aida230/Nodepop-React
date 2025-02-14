import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { client } from "../../api/client"; // Importamos axios para las peticiones HTTP
import Layout from "../../components/layout/Layout";
import Button from "../../components/Button";

const AdvertPageDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el ID del anuncio desde los parámetros de la URL
  const navigate = useNavigate();
  const [advert, setAdvert] = useState<any>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para obtener los detalles del anuncio
  const obtengoAdvert = async () => {
    try {
      const response = await client.get(`/api/v1/adverts/${id}`);
      setAdvert(response.data);
    } catch (err) {
      setError("No se pudo cargar el anuncio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) {
      setError("ID de anuncio no encontrado.");
      setLoading(false);
      return;
    }
    obtengoAdvert();
  }, [id]);

  // Función para eliminar el anuncio
  const handleDelete = async () => {
    try {
      await client.delete(`/api/v1/adverts/${id}`);
      navigate("/adverts"); // Redirigir a la lista después de borrar
    } catch (error) {
      console.error("Error al eliminar el anuncio:", error);
    }
  };

  // Si está cargando, mostramos un mensaje de carga
  if (loading) return <p className="text-center">Cargando...</p>;

  // Si hay error, mostramos el mensaje de error
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Layout>
      <div className="mx-auto mt-6 mb-6 max-w-md rounded-lg bg-white p-4 shadow">
        <h2 className="mb-3 text-center text-xl font-bold">{advert.name}</h2>

        {/* Imagen del anuncio o placeholder */}
        <div className="mb-4 flex justify-center">
          <img
            src={advert.photo || "/placeholder.jpg"}
            alt={advert.name}
            className="h-64 w-64 rounded-lg object-cover shadow-md"
          />
        </div>

        {/* Detalles del anuncio */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">
            💰 {advert.price} €
          </p>
          <p className="text-sm text-gray-500">
            {advert.sale ? "En venta" : "Se compra"}
          </p>

          {/* Tags */}
          <div className="mt-2 flex justify-center gap-2">
            {advert.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-gray-200 px-3 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Botón de eliminar */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setShowConfirm(true)}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Eliminar anuncio
          </button>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-black">
          <div className="rounded-md bg-white p-6 text-center shadow-lg">
            <p className="text-lg font-semibold">
              ¿Estás seguro de que quieres eliminar este anuncio?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Sí, eliminar
              </button>
              <Button
                onClick={() => setShowConfirm(false)}
                className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AdvertPageDetail;
