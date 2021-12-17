import * as React from "react";
import CarCard from "./CarCard";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import EclipseWidget from "../common/eclipse";
import { useActions } from "../../hooks/useActions";


const CarsList: React.FC = () => {
  const { fetchCars } = useActions();
  const { loading, products } = useTypedSelector((store) => store.car);
  const { cartData } = useTypedSelector((store) => store.cart);

  React.useEffect(() => {
    fetchCars();
  }, []);

  const isCarInCart = (id: number): boolean => {
    return cartData.some((item) => item.productId === id);
  };

  return (
    <div className="row d-flex justify-content-around flex-wrap">
      {loading && <EclipseWidget />}
      {!loading &&
        products.map(({ id, name, price, image }) => (
          <CarCard
            id={id}
            key={id}
            name={name}
            price={price}
            image={image}
            inCart={isCarInCart(id)}
          />
        ))}
    </div>
  );
};

export default CarsList;
