import type { Advert } from "./types";

interface Props {
  advert: Advert;
}

const Advert = ({ advert }: Props) => {
  const { name, sale, price, tags, photo } = advert;
  return (
    <article className="advert">
      <div>
        <img src={photo} alt="" className="advert-photo" />
      </div>
      <div className="advert-details">
        <h2 className="advert-name">{name}</h2>
        <p className="advert-sale">{sale ? "For Sale" : "Wanted"}</p>
        <p className="advert-price">${price}</p>
        <div className="advert-tags">
          {tags.map((tag, index) => (
            <span key={index} className="advert-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default Advert;
