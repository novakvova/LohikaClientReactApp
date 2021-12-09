import CartIcon from "../../common/HeaderCartButton/CartIcon";
import classesIcon from "../../common/HeaderCartButton/HeaderCartButton.module.css";
import { ICartButtonProps } from "./types";

const CartButtonAdd: React.FC<ICartButtonProps> = (props) => {
  return (
    <button
      className="w-75 btn btn-outline-secondary d-flex justify-content-around align-items-center fw-bold"
      type="button"
      id="button-addon2"
      onClick={props.onClick}
    >
      <div className={classesIcon.icon}>
        <CartIcon />
      </div>
      <div>В кошик</div>
    </button>
  );
};
export default CartButtonAdd;
