import * as CarActionCreators from "../../comonents/CarsList/car-actions";
import * as AuthActionCreators from "../../comonents/auth/Login/action";
import * as RegActionCreators from "../../comonents/auth/Register/actions";
import * as ProfileActionCreators from '../../comonents/Profile/actions';
import * as UsersActionCreators from '../../comonents/Users/actions'
import * as SendingCarActionCreators from "../../comonents/AddNewCar/addCar";
import * as CartActionCreators from "../../comonents/Cart/cart-actions";
import * as FleshMessagesActionCreator from "../../comonents/FleshMessages/actions"

const actions = {
  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
  ...CartActionCreators,
  ...ProfileActionCreators,
  ...UsersActionCreators,
  ...FleshMessagesActionCreator,
};
 
export default  actions;
