import { useActions } from "../../../hooks/useActions";
import { v4 as uuid } from "uuid";
import { CategoryInfo } from "../types";
import { useNavigate } from "react-router-dom";
import Modals from "../../common/Modal";

interface Props {
  userItem: CategoryInfo;
}

const UserItem: React.FC<Props> = ({
  userItem: { id, title, image, urlSlug, priority },
}) => {
  const { deleteCategory, getCategoryById } = useActions();
  const navigator = useNavigate();

  const handlerInfo = (id: number) => {
    navigator(`/admin/category/${id}`);
  };
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{title}</td>
      <td>
        <div className="size">
          <img src={`https://vovalohika.tk${image}?t=${uuid()}`} alt="Avatar" />
        </div>
      </td>
      <td>{urlSlug}</td>
      <td>{priority}</td>
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
            await getCategoryById(id);
            await navigator(`/admin/Categories/edit/${id}`);
          }}
        >
          Змінити
        </button>
      </td>
      <td>
        <Modals
          id={id}
          text={"Підтвердіть видалення"}
          deleteFunc={deleteCategory}
        />
      </td>
    </tr>
  );
};

export default UserItem;
