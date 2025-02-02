//import './AdvertsPage.css' creo que este no lo oy a utilizar, solo el module
import styles from "./AdvertsPage.module.css";
//import clsx from 'clsx';
import Button from "../../components/Button.ts";
import { getLastestAdverts } from "./service.ts";
import { useEffect, useState } from "react";
import { Advert } from "./types.ts";
import { logout } from "../auth/service.ts";

interface Props {
  onLogout: () => void;
}

function AdvertsPage({ onLogout }: Props) {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    getLastestAdverts().then((response) => {
      setAdverts(response);
    });
  }, []);

  const handleLogoutClick = async () => {
    await logout();
    onLogout();

  }


  return (
    <div className="container mx-auto px-4">
      <header className="flex items-center justify-between">
      <h1 className="my-4 text-2xl font-bold text-green-600">
        NODEPOP ANUNCIOS
      </h1>
      <Button onClick={handleLogoutClick}>Logout</Button>
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {adverts.map((advert) => (
          <li key={advert.id} className={styles.advertCard}>
            <img
              //src={advert.image}
              //alt={advert.title}
              className={styles.advertImage}
            />
            <p className="text-gray-600">{advert.content}</p>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <Button onClick={() => console.log("Clicked")}>Ver más anuncios</Button>
      </div>
    </div>
  );
}

export default AdvertsPage;
