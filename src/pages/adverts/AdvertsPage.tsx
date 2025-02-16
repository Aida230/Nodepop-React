import styles from "./AdvertsPage.module.css";
import { getLastestAdverts } from "./service.ts";
import { useEffect, useState, useMemo } from "react";
import Layout from "../../components/layout/Layout.tsx";
import Button from "../../components/Button.ts";
import Advert from "./Advert.tsx";
import { Link } from "react-router-dom";

// Define la interfaz para los filtros
interface Filters {
  name: string;
  saleType: string;
  minPrice: string;
  maxPrice: string;
  tags: string[];
}

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
  const [filters, setFilters] = useState<Filters>({
    name: "",
    saleType: "all",
    minPrice: "",
    maxPrice: "",
    tags: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getLastestAdverts()
      .then((response) => {
        setAdverts(response);
      })
      .catch((error) => {
        console.error("Error fetching adverts:", error);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (tag: string) => {
    setFilters((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  const filteredAdverts = useMemo(() => {
    if (!adverts || adverts.length === 0) {
      return [];
    }

    return adverts.filter((advert) => {
      const nameMatch = advert.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());
      const saleTypeMatch =
        filters.saleType === "all" ||
        advert.sale === (filters.saleType === "sale");
      const minPrice =
        filters.minPrice === "" ? -Infinity : Number(filters.minPrice);
      const maxPrice =
        filters.maxPrice === "" ? Infinity : Number(filters.maxPrice);
      const priceMatch = advert.price >= minPrice && advert.price <= maxPrice;
      const tagsMatch = filters.tags.every((tag) => advert.tags?.includes(tag));

      return nameMatch && saleTypeMatch && priceMatch && tagsMatch;
    });
  }, [adverts, filters]);

  return (
    <Layout>
      <div className="advertsPage">
        {/* Formulario de filtros */}
        <div className="mt-4 rounded-md bg-gray-100 p-4 text-gray-800 shadow-sm">
          <h3 className="mb-4 text-2xl font-semibold">Filters</h3>
          <div className="mb-4 flex flex-wrap gap-4">
            {" "}
            {/* Contenedor flex para los filtros */}
            <input
              type="text"
              name="name"
              placeholder="Search by name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-64 rounded-lg bg-gray-800 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none" // Ajustar el ancho
            />
            <select
              name="sale"
              value={filters.saleType}
              onChange={handleFilterChange}
              className="w-64 rounded-lg bg-gray-800 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="all">All</option>
              <option value="true">For Sale</option>
              <option value="false">Wanted</option>
            </select>
            <div className="flex gap-4">
              <input
                type="number"
                name="minPrice"
                placeholder="Min price"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className="w-32 rounded-lg bg-gray-800 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <input
                type="number"
                name="maxPrice"
                placeholder="Max price"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-32 rounded-lg bg-gray-800 p-3 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="mt-3">
            <h4 className="mb-2 text-lg font-semibold">Tags</h4>
            <div className="flex flex-wrap gap-4">
              {["motor", "work", "lifestyle", "mobile"].map((tag) => (
                <label key={tag} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.tags.includes(tag)}
                    onChange={() => handleTagChange(tag)}
                    className="mr-2 focus:ring-2 focus:ring-indigo-500"
                  />
                  <span>{tag}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={() =>
              setFilters({
                name: "",
                saleType: "all",
                minPrice: "",
                maxPrice: "",
                tags: [],
              })
            }
            className="mt-4 w-full rounded-lg bg-red-600 p-3 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            Reset Filters
          </button>
        </div>

        {loading ? (
          <div>Cargando anuncios...</div>
        ) : filteredAdverts.length > 0 ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {filteredAdverts.map((advert) => (
              <li key={advert.id} className={styles.advertCard}>
                <Link to={`/adverts/${advert.id}`}>
                  <Advert advert={advert} />
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
