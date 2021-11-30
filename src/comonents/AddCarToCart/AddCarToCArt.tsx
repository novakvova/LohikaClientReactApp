import { useState } from "react";
import { useActions } from "../../hooks/useActions";
import Modal from "../containers/Modal/Modal";
import classes from './../CarCard/CarCard.module.css'


interface IAddCarToCart {
    id:number,
    image: string,
    name: string,
    price: number
}

const AddCarToCart: React.FC<IAddCarToCart> = ({id, image, name, price}) => {
    const {uploadDataToCart, hideModalAddCarToCart} = useActions();
    const [count, setCount] = useState(0)

    const onChangeCountHandler = (value:number) => {
        setCount(value)
    }

    const uploadItemToCartHandler = () => {
        uploadDataToCart(id, count)
    }

    return <Modal onClose={hideModalAddCarToCart}>
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
            </button>
          </div>
          <div className="col-6">
            <button onClick={uploadItemToCartHandler} type="button" className="btn btn-danger w-100">
              В кошик
            </button>
            <input type="number" value={count} onChange={(event)=>{onChangeCountHandler(+event.target.value)}}/>
          </div>
        </div>
      </div>
    </div>
    </Modal>
}

export default AddCarToCart