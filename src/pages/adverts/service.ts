import { client } from "../../api/client";
import { Advert, AdvertContent } from "./types";

const advertsUrl = "/api/v1/adverts"; //añadido v1

export const getLastestAdverts = async () => {
  const response = await client.get<Advert[]>(advertsUrl);
  return response.data;
};

//export const getLastestAdverts = async () => {
//const adverts: Advert[] = await client.get(advertsUrl)
//return adverts;
//};

// aun no lo estamos utilizando
export const createAdvert = async (advert: AdvertContent) => {
  const response = await client.post<Advert>(advertsUrl, advert);
  return response.data;
};
