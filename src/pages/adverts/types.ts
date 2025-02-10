export interface Advert {
  id: number;
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo: string;
}

export interface AdvertContent {
  name: string;
  price: number;
  sale: boolean;
  tags: string[];
  photo?: File | null; // Asegurar que puede ser un archivo o null
}
