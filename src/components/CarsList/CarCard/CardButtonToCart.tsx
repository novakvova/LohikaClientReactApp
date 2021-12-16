import CartIcon from "../../common/HeaderCartButton/CartIcon";
import classesIcon from "../../common/HeaderCartButton/HeaderCartButton.module.css";

import { ICartButtonProps } from "./types";

const CardButtonToCart: React.FC<ICartButtonProps> = (props) => {
  return (
    <button
      className="w-100 btn btn-outline-success d-flex justify-content-around align-items-center fw-bold"
      type="button"
      id="button-addon2"
      onClick={props.onClick}
    >
      <div className={classesIcon.icon}>
        <CartIcon />
      </div>
      <div>Товар в Кошику</div>
    </button>
  );
};

export default CardButtonToCart;
