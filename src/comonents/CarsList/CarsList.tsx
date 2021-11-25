import http from "../../http_common";
import { useState, useEffect } from "react";
import CarCard from "../CarCard";
import CarsFilter from "../CarsFilter/CarsFilter";
import Loader from "../../assets/Loader";

const CarsList = () => {
  const [carsList, setCarsList] = useState([]);
  const [isLoadData, setIsLoadData] = useState(false);
  const [listToShow, setListToShow] = useState([]);

  useEffect(() => {
    http
      .get("api/Products/list")
      .then((responce) => {
        setCarsList(responce.data);
        setListToShow(responce.data);
        setIsLoadData(true);
      })
      .catch((error) => console.log(error));
  }, []);

  const onSortUpHandler = () => {
    setListToShow(
      [...[...carsList].sort((a, b) => a["price"] - b["price"])].reverse()
    );
  };

  const onSortDownHandler = () => {
    setListToShow([...[...carsList].sort((a, b) => a["price"] - b["price"])]);
  };

  const onClearFilter = () => {
    setListToShow([...carsList]);
  };

  return (
    <div className="row d-flex justify-content-around flex-wrap">
      <CarsFilter
        onSortUp={onSortUpHandler}
        onSortDown={onSortDownHandler}
        onCLearFilter={onClearFilter}
      />
      {!isLoadData && <Loader />}
      {isLoadData &&
        listToShow.map((item) => (
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
