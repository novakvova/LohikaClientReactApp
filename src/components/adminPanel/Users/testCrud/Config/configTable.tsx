import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import { UserInfo } from "../../types";
import { v4 as uuid } from "uuid";
import { useActions } from '../../../../../hooks/useActions';


export const ActionBodyTemplate = (rowData: UserInfo) => {
  const {getUserById} = useActions();
  return (
    <>
      <Link to={`userinfo/${rowData.id}`}>
        <Button
          icon="pi pi-info"
          className="p-button-rounded p-button-info p-mr-2"
        />
      </Link>
      <Link to={`edit/${rowData.id}`}>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => {}}
        />
      </Link>
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-warning p-mr-2"
        onClick={() => {getUserById(rowData.id)}}
      />
    </>
  );
};

export const ImageBodyTemplate = (rowData: UserInfo) => {
  return (
    <img
      src={`https://vovalohika.tk${rowData.photo}?t=${uuid()}`}
      height="70"
      onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
        ((event.target as HTMLImageElement).src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
      alt="UserAvatar"
      className="product-image"
      style={{width: "auto"}}
    />
  );
};

export const Header = <div className="table-header">Користувачі</div>;


