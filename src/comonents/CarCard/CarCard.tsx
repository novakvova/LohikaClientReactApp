import { useActions } from "../../hooks/useActions";

import classes from "./CarCard.module.css";

interface CarCArdProps {
  id: number
  name: string;
  price: number;
  image: string;
}

const CarCard: React.FC<CarCArdProps> = ({id, name, price, image }) => {

const {uploadDataToCart} = useActions();

const uploadItemToCartHandler = () => {
  uploadDataToCart(id, 1)
}

  return (
    <div className={`card ${classes.carCard} mt-3`}>
        <img 
          src={`https://vovalohika.tk${image}`}
          className="card-img-top h-50 mt-2 rounded-3"
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
            <button onClick={uploadItemToCartHandler} type="button" className="btn btn-danger w-100">
              В кошик
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
