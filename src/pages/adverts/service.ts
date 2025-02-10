import { client } from "../../api/client";
import { Advert, AdvertContent } from "./types";

const advertsUrl = "api/v1/adverts"; //añadido v1

export const getLastestAdverts = async () => {
  const response = await client.get<Advert[]>(advertsUrl);
  return response.data;
};

export const createAdvert = async (advert: AdvertContent) => {
  const formData = new FormData();

  // Agregamos los datos de advert a FormData
  formData.append("name", advert.name);
  formData.append("sale", String(advert.sale)); // Convierte a string si sale es booleano
  formData.append("price", String(advert.price)); // Convierte a string si price es número
  formData.append("tags", JSON.stringify(advert.tags)); // Los tags deben enviarse como string

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
}
