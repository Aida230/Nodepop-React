import styles from "./AdvertsPage.module.css";
import { getLastestAdverts } from "./service.ts";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout.tsx";
import Button from "../../components/Button.ts";
import Advert from "./Advert.tsx";

const EmptyList = () => {
  return (
    <div className="advertsPage-empty">
      <p>Be the first one!</p>
      <Button>Create advert</Button>
    </div>
  );
};

function AdvertsPage() {
  const [adverts, setAdverts] = useState<Advert[]>([]);

  useEffect(() => {
    getLastestAdverts().then((response) => {
      setAdverts(response);
    });
  }, []);

  return (
    <Layout title="">
      <div className="advertsPage">
        {adverts.length ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {adverts.map((advert) => (
              <li key={advert.id} className={styles.advertCard}>
                <Advert advert={advert}></Advert>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyList />
        )}
      </div>
    </Layout>
  );
}

export default AdvertsPage;
