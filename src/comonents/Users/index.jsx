import { useEffect } from 'react';
import Loader from '../../assets/Loader';
import { useActions } from '../../hooks/useActions';
import { useNavigate, Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';


import './index.css';

const Users = () => {

  const { users, loading } = useTypedSelector(store=> store.users);
  const {fetchUsers, deleteUser} = useActions();
  const navigator = useNavigate();
  


  useEffect(() => {
    fetchUsers();
  }, []);
	return (
    <div className="contgainer">
      <h2>Users</h2>
      <table className="table align-middle table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Ім'я</th>
            <th scope="col">Фото</th>
            <th scope="col">Телефон</th>
            <th scope="col">Email</th>
            <th scope="col">Змінити</th>
            <th scope="col">Видалити</th>
          </tr>
        </thead>

          <tbody>
            {users.map(({ id, firstName, image, phone, email }) => (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>{firstName}</td>
                <td>
                  <div className="size">
                    <img
                      src={
                        image.endsWith("images/")
                          ? "https://mdbootstrap.com/img/Photos/new-templates/bootstrap-chat/ava3.png"
                          : `https://vovalohika.tk${image}`
                      }
                      alt={image}
                    />
                  </div>
                </td>
                <td>{phone}</td>
                <td>{email}</td>
                <td>
                  <button className="btn btn-success btn-sm">Змінити</button>
                </td>
                <td>
                  <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteUser(id)}    
                >Видалити</button>
                </td>
              </tr>
            ))}
          </tbody>
      </table>
      {loading && (
        <h2 className="text-center">
          <Loader />
        </h2>
      )}
    </div>
  );

}

export default Users;