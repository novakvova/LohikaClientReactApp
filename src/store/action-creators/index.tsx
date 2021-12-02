import * as CarActionCreators from "./car";
import * as AuthActionCreators from "./auth";
import * as RegActionCreators from "../../comonents/auth/Register/actions";
import * as SendingCarActionCreators from "./sendingCar";
import * as CartActionCreators from "./cart";
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
