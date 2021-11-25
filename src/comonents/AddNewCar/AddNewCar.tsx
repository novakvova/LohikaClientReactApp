import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputGroup from "../common/InputGroup";
import http from "../../http_common";


const AddNewCar = () => {
  const [error, setError] = useState("");
  const [dataWithForm, setDataWithForm] = useState({});
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

    const formData = new FormData();

    Object.entries(dataWithForm).forEach(([key, value]) =>
      formData.append(key, value as string)
    );
    formData.append("image", selectedFile as any);

    http
      .post("api/Products/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((resp) => {
        console.log("response with sever", resp);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log("errr with serv", error);
        setError(error);
      });
  };

  return (
    <>
      <div className="row">
        <h1 className="text-center">Додати автомобіль</h1>

        <div className="col-4"></div>

        <form onSubmit={handlerSubmit} className="col-4">
          <InputGroup
            name="name"
            label="Марка машини"
            error={error}
            onChange={onChangeInputHandler}
          />

          <InputGroup
            name="priority"
            label="Приорітет"
            error={error}
            onChange={onChangeInputHandler}
            type="text"
          />
          <InputGroup
            name="price"
            label="Ціна"
            error={error}
            onChange={onChangeInputHandler}
            type="text"
          />
          <InputGroup
            name="image"
            label="Фото"
            error={error}
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
