import { Button } from 'primereact/button';
import { InputSwitch } from 'primereact/inputswitch';
import { v4 as uuid } from "uuid";
import { IEditorValues } from '../types';

export const ImageBodyTemplate = (rowData: IEditorValues) => {
  return (
    <img
      src={`https://vovalohika.tk/images/150_${rowData.image}?t=${uuid()}`}
      height="70"
      onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
        ((event.target as HTMLImageElement).src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
      alt="UserAvatar"
      className="product-image"
      style={{ width: "auto" }}
    />
  );
};



export const Header = () => {
   // const [toogleSearch, setToogleSearch] = useState(false);

  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="table-header">Новини</div>
        <Button
          label="Пошук"
          icon="pi pi-search"
          onClick={() => {
           // setToogleSearch((prev) => !prev)
          }}
        />
      </div>
    </>
  );
};

export const IsSHowBodyTemplate = (rowData: IEditorValues) => {
  return (
    <>
      <InputSwitch
        checked={rowData.isShow}
        onChange={(e) => console.log(e.value) }
      />
    </>
  );
};
