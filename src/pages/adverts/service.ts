import { client } from "../../api/client";
import { Advert, AdvertContent } from "./types";

const advertsUrl = "api/v1/adverts"; //añadido v1

//Para obtener el listado de anuncios
export const getLastestAdverts = async () => {
  const response = await client.get<Advert[]>(advertsUrl);
  return response.data;
};

//para crear los anuncios
export const createAdvert = async (advert: AdvertContent) => {
  const formData = new FormData();

  // Agregamos los datos de advert a FormData
  formData.append("name", advert.name);
  formData.append("sale", String(advert.sale)); // Convierte a string si sale es booleano
  formData.append("price", String(advert.price)); // Convierte a string si price es número
  formData.append("tags", advert.tags.join(",")); // Convierte el array en una cadena separada por comas

  if (advert.photo instanceof File) {
    formData.append("photo", advert.photo);
  }
  const response = await client.post(advertsUrl, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Usamos multipart para enviar FormData
    },
  });
  // Si la respuesta es exitosa, se retorna el anuncio creado
  return response.data;
};

//Para obtener el detalle del anuncio
export const getAdvertById = async (id: string) => {
  try {
    const response = await client.get(`/api/v1/adverts/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el anuncio:", error);
    return null;
  }
};

//Para borrar el anuncio

export const deleteAdvert = async (id: string) => {
  try {
    await client.delete(`/api/v1/adverts/${id}`);
  } catch (error) {
    console.error("Error eliminando el anuncio:", error);
    throw error;
  }
};
