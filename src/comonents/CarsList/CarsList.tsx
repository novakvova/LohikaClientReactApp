import * as React from 'react';

import { useState, useEffect } from "react";
import CarCard from "../CarCard";
import CarsFilter from "../CarsFilter/CarsFilter";
import Loader from "../../assets/Loader";
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '../../hooks/useActions';

const CarsList : React.FC = () => {

  const {cars, loading, error} = useTypedSelector(store => store.car);
  const {fetchCars} = useActions();

  const [carsList, setCarsList] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const [listToShow, setListToShow] = useState([]);

  useEffect(() => {
    fetchCars();

  }, []);

  // const onSortUpHandler = () => {
  //   setListToShow(
  //     [...[...cars].sort((a, b) => a["price"] - b["price"])].reverse()
  //   );
  // };

  // const onSortDownHandler = () => {
  //   setListToShow([...[...cars].sort((a, b) => a["price"] - b["price"])]);
  // };

  // const onClearFilter = () => {
  //   setListToShow([...cars]);
  // };

  return (
    <div className="row d-flex justify-content-around flex-wrap">
      {/* <CarsFilter
        onSortUp={onSortUpHandler}
        onSortDown={onSortDownHandler}
        onCLearFilter={onClearFilter}
      /> */}
      {loading && <Loader />}
      {!loading &&
        cars.map((item) => (
          <CarCard
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
