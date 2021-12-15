import { useActions } from '../../../hooks/useActions';
import { v4 as uuid } from "uuid";
import { UserInfo } from '../types';
import { useNavigate } from 'react-router-dom';
import { addFlashMessage, deleteFlashMessage } from '../../FleshMessages/actions';
import Modal from '../../common/Modal';

interface Props {
  userItem: UserInfo;
}


const UserItem: React.FC<Props> = ({userItem:{id,firstName, photo, phone, email}}) => {
  const { fetchUsers, deleteUser, getUserById } = useActions();
  const navigator = useNavigate();


  // const modalClick = async (bool: boolean) => {
  //   // if (bool) {
  //   //   const response = await deleteUser(id);
  //   //   const status = response as number;

  //   //   if (status === 404){
  //   //     await addFlashMessage({
  //   //       type: "error",
  //   //       message: "Даного користувача не знайдено",
  //   //     });
  //   //   }
  //   //   else if (status === 200){
  //   //     await addFlashMessage({
  //   //       type: "success",
  //   //       message: "Користувача видалено",
  //   //     });
  //   //   }
  //   //   else {
  //   //     await addFlashMessage({
  //   //       type: "error",
  //   //       message: "Щось пішло не так",
  //   //     });
  //   //   }
  //   //   setTimeout(() => {deleteFlashMessage()}, 2000)
  //   // };
	// console.log(bool);
	
	// return bool
  // };


  const handlerInfo = (id: number) => {
    navigator(`${id}`);
  };
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{firstName}</td>
      <td>
        <div className="size">
          <img src={`https://vovalohika.tk${photo}?t=${uuid()}`} alt="Avatar" />
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
       >
          Видалити
        </button>
      </td>
    </tr>
  );
};

export default UserItem;