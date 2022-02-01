
import { ISearchCar } from "../../../CarsList/types";
import { v4 as uuid } from "uuid";

export const ImageBodyTemplate = (rowData: ISearchCar) => {
 
  
  return (
    <img
      src={`https://vovalohika.tk/images/150_${rowData.images[0]}?t=${uuid()}`}
      height="70"
      onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
        ((event.target as HTMLImageElement).src =
          "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
      }
      alt="productImage"
      className="product-image"
      style={{width: "auto"}}
    />
  );
};



