export interface Advert {
  id: number;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo: string;
}

export interface AdvertContent {
  content: string;
}
