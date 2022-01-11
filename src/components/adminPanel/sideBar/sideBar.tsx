import { Menu } from "primereact/menu";
import { useNavigate } from 'react-router-dom';
import { useActions } from '../../../hooks/useActions';


const SideBar = () => {
  const navigate = useNavigate();
  const { LogoutUser } = useActions();
  const items = [
    {
      label: "Користувачі",
      items: [
        {
          label: "Список",
          icon: "pi pi-fw pi-list",
          command: () => navigate("/adminPanel/users"),
        },
        {
          label: "Добавити",
          icon: "pi pi-fw pi-user-plus",
          command: () => navigate("/adminPanel/users/create"),
        },
      ],
    },
    {
      label: "Продукти",
      items: [
        {
          label: "Список",
          icon: "pi pi-fw pi-list",
        },
        {
          label: "Добавити",
          icon: "pi pi-fw pi-plus",
        },
      ],
    },
    {
      label: "Категорії",
      items: [
        {
          label: "Список категорій",
          icon: "pi pi-fw pi-list",
          command: () => navigate("/adminPanel/categories"),
        },
        {
          label: "Додати",
          icon: "pi pi-fw pi-user-plus",
          command: () => navigate("/adminPanel/categories/add"),
        },
      ],
    },
    {
      label: "Навігація",
      items: [
        {
          label: "На головну",
          icon: "pi pi-arrow-right",
          command: () => navigate("/"),
        },
        {
          label: "Вийти",
          icon: "pi pi-arrow-right",
          command: () => {
            LogoutUser();
            navigate("/");
          },
        },
      ],
    },
  ];
  return (
    <>
      <div>
        <div className="card">
          <Menu
            model={items}
            className="p-panelmenu"
            style={{ background: "#353b42", width: "auto" }}
          />
        </div>
      </div>
    </>
  );
};

export default SideBar;
