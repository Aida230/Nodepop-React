import type { Advert } from "./types";

interface Props {
  advert: Advert;
}

const Advert = ({ advert }: Props) => {
  const { name, sale, price, tags, photo } = advert;
  return (
    <article className="advert">
      <div className="advert-details">
        <div>
          <img src={photo || 'https://placehold.co/400x200'} alt="" className="advert-photo" />
        </div>
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
