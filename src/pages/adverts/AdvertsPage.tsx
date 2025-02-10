import styles from "./AdvertsPage.module.css";
import { getLastestAdverts } from "./service.ts";
import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout.tsx";
import Button from "../../components/Button.ts";
import Advert from "./Advert.tsx";
import { Link } from "react-router-dom";

const EmptyList = () => {
  return (
    <div className="advertsPage-empty">
      <p>Be the first one!</p>
      <Link to="new">
        <Button>Create advert</Button>
      </Link>
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
    <Layout>
      <div className="advertsPage">
        {adverts.length ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {adverts.map((advert) => (
              <li key={advert.id} className={styles.advertCard}>
                <Link to={`/adverts/${advert.id}`}>
                  <Advert advert={advert}></Advert>
                </Link>
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
