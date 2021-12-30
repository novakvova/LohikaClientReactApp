import { PanelMenu } from "primereact/panelmenu";
import { useNavigate } from 'react-router-dom';


const SideBar = () => {
  const navigate = useNavigate();
  const items = [
    {
      label: "Користувачі",
      icon: "pi pi-fw pi-user",
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
      icon: "pi pi-fw pi-car",
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
      icon: "pi pi-fw pi-user",
      items: [
        {
          label: "Список категорій",
          icon: "pi pi-fw pi-list",
          command: () => navigate("/categories/list"),
        },
        {
          label: "Додати",
          icon: "pi pi-fw pi-user-plus",
          command: () => navigate("/categories/add"),
        },
      ],
    },
  ];
  return (
    <>
      <div>
        <div className="card">
          <PanelMenu model={items} style={{ width: "auto" }} />
        </div>
      </div>
    </>
  );
};

export default SideBar;
