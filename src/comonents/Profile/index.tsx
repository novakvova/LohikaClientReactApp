import { useTypedSelector } from "../../hooks/useTypedSelector";
import InputGroup from "../common/InputGroup";

const ProfilePage = () => {
  const { user } = useTypedSelector((store) => store.auth);

  const handlerChange = () => {};
  const handlerSubmit = () => {};

  return (
    <div className="row">
      <div className="col-4">
        <img
          src={`https://vovalohika.tk${user.image}`}
          alt=""
          className="mt-5 w-100"
        />
      </div>
      <div className="col-8 mb-4">
        <h1 className="text-center mt-4">Профіль</h1>
        <form onSubmit={handlerSubmit} name="test">
          <InputGroup name="firstName" label="Ім'я" onChange={handlerChange} />

          <InputGroup
            name="lastName"
            label="Прізвище"
            onChange={handlerChange}
          />

          <InputGroup name="email" label="Email" onChange={handlerChange} />

          <InputGroup
            name="photo"
            label="Аватар"
            type="file"
            onChange={handlerChange}
            value={user.email}
          />

          <InputGroup name="phone" label="Телефон" onChange={handlerChange} />

          <div className="text-center">
            <button type="submit" className="btn btn-secondary" disabled={true}>
              Змінити
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
