import { client } from '../../api/client';
import { Advert } from './types'

const advertsUrl = "/api/adverts"


export const getLastestAdverts = async () => {
  const adverts: Advert[] = await client.get(advertsUrl)
    return adverts;
}