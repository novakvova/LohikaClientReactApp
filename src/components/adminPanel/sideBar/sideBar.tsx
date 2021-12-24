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
        {
          label: "Список новий",
          icon: "pi pi-fw pi-list",
          command: () => navigate("/adminPanel/users/testCrud"),
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
  ];
  return (
    <>
      <div>
        <div className="card">
          <PanelMenu
            model={items}
            className="p-panelmenu"
            style={{ background: "#353b42" }}
          />
        </div>
      </div>
    </>
  );
};

export default SideBar;
