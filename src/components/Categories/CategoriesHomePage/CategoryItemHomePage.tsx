import { v4 as uuid } from 'uuid';
import { CategoryInfo } from '../types';
import { Link } from 'react-router-dom';

interface Props {
  categoryItem: CategoryInfo;
}

const CategoryItemHomePage: React.FC<Props> = ({ categoryItem: { id, title, image } }) => {

  return (
    <Link to={`/adminPanel/categories/get/${id}`}>
      <div className="card text-dark bg-light mb-3">
        <div className="card-body">
          <img
            className="d-block mb-3 w-300"
            src={`https://vovalohika.tk/images/300_${image}?t=${uuid()}`}
            alt="Avatar"
          />
          <div className="text-dark">{title}</div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItemHomePage;
