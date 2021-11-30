import * as React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../common/InputGroup";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";

const AddNewCar: React.FC = () => {
  const { nav } = useTypedSelector((store) => store.sendingCar);
  const {sendCar} = useActions()

  const [dataWithForm, setDataWithForm] = useState({name:'', priority:'', price:''});
  const [selectedFile, setSelectedFile] = useState();

  const navigate = useNavigate();

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataWithForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onChangeInputFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageData = (e.target as HTMLInputElement | any).files[0];
    setSelectedFile(imageData);
  };

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendCar(dataWithForm, selectedFile)  
  };

  if (nav) {
    navigate('/')
  }
  
  return (
    <>
      <div className="row">
        <h1 className="text-center">Додати автомобіль</h1>

        <div className="col-4"></div>

        <form onSubmit={handlerSubmit} className="col-4">
          <InputGroup
            name="name"
            label="Марка машини"
            error=""
            onChange={onChangeInputHandler}
          />

          <InputGroup
            name="priority"
            label="Приорітет"
            error=""
            onChange={onChangeInputHandler}
            type="text"
          />
          <InputGroup
            name="price"
            label="Ціна"
            error=""
            onChange={onChangeInputHandler}
            type="text"
          />
          <InputGroup
            name="image"
            label="Фото"
            error=""
            onChange={onChangeInputFileHandler}
            type="file"
          />
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              Додати машину
            </button>
          </div>
        </form>
        <div className="col-4"></div>
      </div>
    </>
  );
};

export default AddNewCar;
