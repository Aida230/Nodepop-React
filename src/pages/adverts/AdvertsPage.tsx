//import './AdvertsPage.css' creo que este no lo oy a utilizar, solo el module
import styles from './AdvertsPage.module.css'
//import clsx from 'clsx';
import Button from "../../components/Button.ts"
import { getLastestAdverts } from './service.ts';
import { useEffect, useState } from 'react'
import { Advert } from './types.ts'



//vamos a crear un componente, que es una funcion con un nombre que se pueda reutilazar

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    getLastestAdverts().then((response) => {
      setAdverts(response)
  },)
  }, []);
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-green-600 text-2xl font-bold my-4">NODEPOP ANUNCIOS</h1>
      
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {adverts.map((advert) => (
          <li 
            key={advert.id} 
            className={styles.advertCard}
          >
            <img 
              //src={advert.image} 
              //alt={advert.title} 
              className={styles.advertImage}
            />
            <p className="text-gray-600">{advert.content}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-6">
      <Button onClick={() => console.log("Clicked")}>Ver más anuncios</Button>
      </div>
    </div>
  );
}

export default AdvertsPage