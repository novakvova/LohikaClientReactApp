import { useState } from "react";
import InputGroup from "../../common/InputGroup";
import http from "../../../http_common";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const [mystate, setMystate] = useState({});

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //console.log(e.target.name, e.target.value);
    const newState = {
      ...mystate,
      [e.target.name]: e.target.value,
    };
    // console.log("my state", newState);
    setMystate(newState);
  };

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    //Object.entries(mystate).forEach(([key, value]) => formData.append(key, value));
    formData.append("Email", "vv@ff.ff");

    http
      .post("api/account/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(
        (resp) => {},
        (error) => {
          console.log("error", error.response.data);
        }
      );
    //console.log("Server send model", mystate);
  };

  return (
    <>
      <h1>Реєстрація</h1>
      <form onSubmit={handlerSubmit}>
        <InputGroup
          name="lastName"
          label="Прізвище"
          error={error}
          onChange={handlerChange}
        />

        <InputGroup
          name="firstName"
          label="Ім'я"
          error={error}
          onChange={handlerChange}
        />

        <button type="submit" className="btn btn-primary">
          Реєстрація
        </button>
      </form>
    </>
  );
};
export default RegisterPage;
