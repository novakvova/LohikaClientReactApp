import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../hooks/useActions";
import Modal from "../../containers/Modal/Modal";
import { ISearchCar } from "../types";
import classes from "./CarListAdmin.module.css";
import { v4 as uuid } from "uuid";
import EclipseWidget from "../../common/eclipse";

interface Props {
  car: ISearchCar;
}

const CarAdminItem: React.FC<Props> = ({
  car: { id, name, price, priority, image, images },
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { fetchCarById, deleteCar } = useActions();

  const navigator = useNavigate();
  const wievCar = (id: number) => {
    navigator(`${id}`);
  };
  const editCar = async (id: number) => {
    setShowLoader(true);
    await fetchCarById(id);
    setShowLoader(false);
    navigator(`/cars/edit/${id}`);
  };

  const deleteCarFromList = async (id: number) => {
    closeModal();
    setShowLoader(true);
    await deleteCar(id);
    setShowLoader(false);
    navigator("/cars/");
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <tr className={`table-secondary ${classes.item}`}>
        <th scope="row">{id}</th>
        <td>
          <img
            className="h"
            src={`https://vovalohika.tk/images/600_${images[0]}?t=${uuid()}`}
            alt=""
          />
        </td>
        <td>{name}</td>
        <td>{price}</td>
        <td>{priority}</td>
        <td>
          <button
            onClick={() => {
              wievCar(id);
            }}
            type="button"
            className="btn btn btn-secondary"
          >
            Переглянути
          </button>
        </td>
        <td>
          <button
            onClick={() => {
              editCar(id);
            }}
            type="button"
            className="btn btn-success"
          >
            Редагувати
          </button>
        </td>
        <td>
          <button onClick={openModal} type="button" className="btn btn-danger">
            Видалити
          </button>
          {showLoader && <EclipseWidget />}
          {showModal && (
            <Modal>
              <h3 className="text-black-50">
                Видалити <span className="text-dark">{name} ?</span>
              </h3>
              <div className="text-center">
                <img
                  className="rounded"
                  src={`https://vovalohika.tk/images/600_${
                    images[0]
                  }?t=${uuid()}`}
                  alt=""
                />
              </div>
              <div className="d-flex flex-row-reverse">
                <button
                  onClick={closeModal}
                  type="button"
                  className="me-5 btn btn-secondary"
                >
                  Відмінити
                </button>
                <button
                  onClick={() => {
                    deleteCarFromList(id);
                  }}
                  type="button"
                  className="me-2 btn btn-danger"
                >
                  Видалити
                </button>
              </div>
            </Modal>
          )}
        </td>
      </tr>
    </>
  );
};

export default CarAdminItem;
