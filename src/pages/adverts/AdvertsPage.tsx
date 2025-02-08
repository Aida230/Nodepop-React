import styles from "./AdvertsPage.module.css";
import { getLastestAdverts } from "./service.ts";
import { useEffect, useState } from "react";
import { Advert } from "./types.ts";
import Layout from '../../components/layout/Layout.tsx'


function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    getLastestAdverts().then((response) => {
      setAdverts(response);
    });
  }, []);


  return (
    <Layout title= "">
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
    </Layout>
  );
}

export default AdvertsPage;
