import { useEffect, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Modal from '../../common/Modal';
import './index.css';
import EclipseWidget from '../../common/eclipse';
import CreateUser from '../CreatePage';

const Users = () => {
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);
  const { users, loading } = useTypedSelector( store => store.userCrud)
  const [idDel, setIdDel]  = useState<number>(0)
  const { fetchUsers, deleteUser, getUserById } = useActions();
  const navigator = useNavigate();

  const setToggle = (val:boolean) => setToggleAdd(!val)

  const modalClick = (bool: boolean) => {
    if (bool) deleteUser(idDel);    
  }
  
  useEffect(() => {
    fetchUsers();
  }, []);

const handlerInfo = (id:number) => {
  navigator(`${id}`);
}

	return (
    <div className="contgainer">
      <button
        className="btn btn-primary m-3 "
        onClick={() => setToggle(toggleAdd)}
      >
        Добавати користувача
      </button>
      {toggleAdd && <CreateUser toggle={setToggle} />}
      <h1 className="text-center m-4">Користувачі</h1>
      <Modal text="Дійсно видалити" click={modalClick} />
      <table className="table align-middle table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ім'я</th>
            <th scope="col">Фото</th>
            <th scope="col">Телефон</th>
            <th scope="col">Email</th>
            <th scope="col">Інформація</th>
            <th scope="col">Змінити</th>
            <th scope="col">Видалити</th>
          </tr>
        </thead>

        <tbody>
          {users.map(({ id, firstName, photo, phone, email }) => (
            <tr key={id}>
              <th scope="row">{id}</th>
              <td>{firstName}</td>
              <td>
                <div className="size">
                  <img
                    src={`https://vovalohika.tk${photo}`}
                    alt="Avatar"
                  />
                </div>
              </td>
              <td>{phone}</td>
              <td>{email}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handlerInfo(id)}
                >
                  Інформація
                </button>
              </td>
              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={async () => {
                    await getUserById(id);
                    await navigator(`edit/${id}`);
                  }}
                >
                  Змінити
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => setIdDel(id)}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <EclipseWidget />}
    </div>
  );
}

export default Users;