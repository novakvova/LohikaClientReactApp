import { useActions } from "../../../hooks/useActions";
import { v4 as uuid } from "uuid";
import { CategoryInfo } from "../types";
import { useNavigate } from "react-router-dom";
import Modals from "../../common/Modal";

interface Props {
  categoryItem: CategoryInfo;
}

const CategoryItem: React.FC<Props> = ({
  categoryItem: { id, title, urlSlug, image, priority },
}) => {
  const { deleteCategory, getCategoryById } = useActions();
  const navigator = useNavigate();

  const handlerInfo = (id: number) => {

    navigator(`/adminPanel/categories/get/${id}`);

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
      <td>{priority}</td>
      <td>{urlSlug}</td>
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
            await navigator(`/adminPanel/categories/edit/${id}`);

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

export default CategoryItem;
