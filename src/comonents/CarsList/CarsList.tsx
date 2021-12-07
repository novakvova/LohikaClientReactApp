import * as React from "react";

import { useEffect } from "react";
import CarCard from "../CarCard";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import EclipseWidget from "../common/eclipse";

const CarsList: React.FC = () => {
  const { cars, loading } = useTypedSelector((store) => store.car);

  const { fetchCars, downloadDataToCart } = useActions();

  useEffect(() => {
    fetchCars();
    downloadDataToCart();
  }, []);

  return (
    <div className="row d-flex justify-content-around flex-wrap">
      {loading && <EclipseWidget />}
      {!loading &&
        cars.map((item) => (
          <CarCard
            id={item["id"]}
            key={item["id"]}
            name={item["name"]}
            price={item["price"]}
            image={item["image"]}
          />
        ))}
    </div>
  );
};

export default CarsList;
