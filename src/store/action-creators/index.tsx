import * as CarActionCreators from "./car";
import * as AuthActionCreators from "../../comonents/auth/Login/action";
import * as RegActionCreators from "../../comonents/auth/Register/actions";
import * as SendingCarActionCreators from "./sendingCar";
import * as CartActionCreators from "./cart";
import * as ProfileActionCreators from '../../comonents/Profile/actions';
import * as UsersActionCreators from '../../comonents/Users/actions'


const actions = {

  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
  ...CartActionCreators,
  ...ProfileActionCreators,
  ...UsersActionCreators,
};
 
export default  actions;
