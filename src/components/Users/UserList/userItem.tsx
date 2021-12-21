import { useActions } from "../../../hooks/useActions";
import { v4 as uuid } from "uuid";
import { UserInfo } from "../types";
import { useNavigate } from "react-router-dom";
import Modals from "../../common/Modal";

interface Props {
  userItem: UserInfo;
}

const UserItem: React.FC<Props> = ({
  userItem: { id, firstName, photo, phone, email },
}) => {
  const { deleteUser, getUserById } = useActions();
  const navigator = useNavigate();

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
        <Modals
          id={id}
          text={"Підтвердіть видалення"}
          deleteFunc={deleteUser}
        />
      </td>
    </tr>
  );
};

export default UserItem;
