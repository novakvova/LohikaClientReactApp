import { useState } from 'react';
import Modal from '../../comonents/common/Modal/Modal'

interface CarCArdProps {
  name: string;
  price: number;
  image: string;
}

const CarCard: React.FC<CarCArdProps> = ({ name, price, image }) => {

  const [modalIsShown, setMdalIsShown] = useState(false);

  const showModaltHandler = () => {
    setMdalIsShown(true);
  };

  const hideModalHandler = () => {
    setMdalIsShown(false);
  };



  return (
    <div className={" col-3 m-1 rounded shadow p-3 mb-5 bg-body rounded"}>
      
        <img 
          src={`https://vovalohika.tk${image}`}
          className="card-img-top h-50"
          alt={name}
        />
      
      
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Ціна: {price} $ </p>
        <div className="row">
          <div className="col-6">
            <button type="button" className="btn btn-secondary w-100">
              Купити
            </button>
          </div>
          <div className="col-6">
            <button onClick={showModaltHandler} type="button" className="btn btn-danger w-100">
              Видалити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
