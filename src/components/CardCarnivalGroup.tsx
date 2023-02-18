import locationIcon from '../assets/icon/location.svg';
import { CarnivalGroup } from '../global/Types';

export function CardCarnivalGroup({
  coverPath,
  title,
  description,
  location,
}: CarnivalGroup) {
  return (
    <li className="card">
      <div className="card__image">
        <div className="card__overlay"></div>
        <img src={coverPath} alt="" />
      </div>

      <div className="card__info">
        <h3>{title}</h3>
        <p>
          {description ??
            'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.'}
        </p>

        <div className="card__location">
          <img src={locationIcon} alt="" width={24} height={24} />
          <span>
            {location.city} - {location.state}
          </span>
        </div>
      </div>
    </li>
  );
}
