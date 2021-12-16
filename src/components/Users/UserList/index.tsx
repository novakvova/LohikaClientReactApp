import { useEffect } from 'react';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import './index.css';
import UserItem from './userItem';
import { UserInfo } from '../types';

const Users = () => {
  const { users } = useTypedSelector( store => store.userCrud)
  const { getSearchResult } = useActions();
  
  useEffect(() => {
    getSearchResult({});
  }, []);

	return (
    <div className="container">
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
              <UserItem key={idx} userItem={userItem} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;