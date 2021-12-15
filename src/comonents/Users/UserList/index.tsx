import { useEffect, useState } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { v4 as uuid } from "uuid";
import Modal from '../../common/Modal';
import './index.css';
import EclipseWidget from '../../common/eclipse';
import UserItem from './userItem';
import { UserInfo } from '../types';

const Users = () => {
  const { users, loading } = useTypedSelector( store => store.userCrud)
  const { fetchUsers, deleteUser, getUserById, deleteFlashMessage, addFlashMessage } = useActions();
  const navigator = useNavigate();


  
  useEffect(() => {
    fetchUsers();
  }, []);



	return (
    <div className="contgainer">
      <button
        className="btn btn-primary m-3"
        onClick={() => navigator("/users/create")}
      >
        Добавати користувача
      </button>
      <button
        className="btn btn-primary m-3"
        onClick={() => navigator("/users/search")}
      >
        Пошук
      </button>
      <h1 className="text-center m-2">Користувачі</h1>
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
          {users.map((userItem: UserInfo, idx) => (
            <>
              <UserItem key={uuid()} userItem={userItem} />
              {console.log(userItem.id)}

              <Modal key={idx} text="Дійсно видалити" id={userItem.id} />
            </>
          ))}
        </tbody>
      </table>
      {loading && <EclipseWidget />}
    </div>
  );
}

export default Users;