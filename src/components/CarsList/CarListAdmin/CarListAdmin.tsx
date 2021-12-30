import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import EclipseWidget from "../../common/eclipse";
import CarSearch from "../CarSearch/CarSearch";

import CarAdminItem from "./CarAdminItem";
import { ISearchCar } from "../types";

const CarsListAdmin = () => {
  const [showLoader, setShowLoader] = useState(false);
  const { products } = useTypedSelector((store) => store.car);
  const { fetchCarsSearch } = useActions();

  const downloadCarList = useCallback(async () => {
    setShowLoader(true);
    await fetchCarsSearch({});
    setShowLoader(false);
  }, [fetchCarsSearch]);

  useEffect(() => {
    downloadCarList();
  }, [downloadCarList]);

  return (
    <>
      <Helmet>
        <title>Admin-пошук машин</title>
      </Helmet>
      <h1 className="text-center">Автомобілі</h1>
      <CarSearch>
        {showLoader && <EclipseWidget />}
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Priority</th>
            </tr>
          </thead>
          <tbody>
            {products.map((car: ISearchCar, index) => {
              return <CarAdminItem key={index} car={car} />;
            })}
          </tbody>
        </table>
      </CarSearch>
    </>
  );
};

export default CarsListAdmin;
