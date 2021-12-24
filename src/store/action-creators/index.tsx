import * as CarActionCreators from "../../components/CarsList/car-actions";
import * as AuthActionCreators from "../../components/auth/Login/action";
import * as RegActionCreators from "../../components/auth/Register/actions";
import * as ProfileActionCreators from '../../components/Profile/actions';
import * as UsersActionCreators from '../../components/adminPanel/Users/actions'
import * as SendingCarActionCreators from "../../components/AddNewCar/addCar";
import * as CartActionCreators from "../../components/Cart/cart-actions";
import * as FleshMessagesActionCreator from "../../components/FleshMessages/actions"
import * as RecoverPasswordActionCreator from "../../components/auth/recoverPassword/action"
import * as CategoryActionCreators from "../../components/Categories/AddNewCategory/AddCategory";

const actions = {
  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
  ...CartActionCreators,
  ...ProfileActionCreators,
  ...UsersActionCreators,
  ...FleshMessagesActionCreator,
  ...RecoverPasswordActionCreator,
  ...CategoryActionCreators,
};
 
export default  actions;
