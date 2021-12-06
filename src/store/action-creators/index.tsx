import * as CarActionCreators from "../../comonents/CarsList/car-actions";
import * as AuthActionCreators from "../../comonents/auth/Login/action";
import * as RegActionCreators from "../../comonents/auth/Register/actions";
import * as SendingCarActionCreators from "../../comonents/AddNewCar/addCar";
import * as CartActionCreators from "../../comonents/Cart/cart-actions";
import * as ProfileActionCreators from './profile';
import * as UsersActionCreators from './users'


const actions = {

  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
  ...CartActionCreators,
  ...ProfileActionCreators,
  ...UsersActionCreators
};
 
export default  actions;
