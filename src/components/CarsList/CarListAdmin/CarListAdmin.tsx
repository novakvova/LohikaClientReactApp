import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import CarSearch from "../CarSearch/CarSearch";
import classes from "./CarListAdmin.module.css";

const CarsListAdmin = () => {
  const { products } = useTypedSelector((store) => store.car);
  const { fetchCarsSearch } = useActions();
  useEffect(() => {
    fetchCarsSearch({});
  }, []);
  const navigator = useNavigate()
  const wievCar = (id: number) => {
    console.log(id)
    navigator(`${id}`)
  }
  const editCar = (id: number) => {
    console.log(id)
    navigator(`/cars/edit/${id}`)
  }

  return (
    <CarSearch>
      <Helmet>
        <title>Admin-пошук машин</title>
      </Helmet>
      <table className="table table-hover">
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
          {products.map((car) => {
            return (
              <tr key={car.id} className={`table-secondary ${classes.item}`}>
                <th scope="row">{car.id}</th>
                <td>
                  <img
                    className="h"
                    src={`https://vovalohika.tk${car.image}`}
                    alt=""
                  />
                </td>
                <td>{car.name}</td>
                <td>{car.price}</td>
                <td>{car.priority}</td>
                <td>
                  <button
                  onClick={() => {wievCar(car.id)}}
                  type="button" className="btn btn btn-secondary">
                    Переглянути
                  </button>
                </td>
                <td>
                  <button
                  onClick={()=> {editCar(car.id)}}
                  type="button" className="btn btn-info">
                    Редагувати
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger">
                    Видалити
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </CarSearch>
  );
};

export default CarsListAdmin;
