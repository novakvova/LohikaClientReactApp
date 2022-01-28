import * as React from "react";
import CarCard from "./CarCard";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import EclipseWidget from "../common/eclipse";

const CarsList: React.FC = () => {
  const { loading, products } = useTypedSelector((store) => store.car);
  const { cartData } = useTypedSelector((store) => store.cart);

  const isCarInCart = (id: number): boolean => {
    return cartData.some((item) => item.productId === id);
  };

  return (
    <div className="row d-flex justify-content-around flex-wrap">
      {loading && <EclipseWidget />}
      {!loading &&
        products.map(({ id, name, price, image, images, categoryName }) => (
          <CarCard
            id={id}
            key={id}
            name={name}
            price={price}
            image={image}
            images={images}
            inCart={isCarInCart(id)}
            categoryName={categoryName}
          />
        ))}
    </div>
  );
};

export default CarsList;
