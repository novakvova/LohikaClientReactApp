import * as CarActionCreators from "./car";
import * as AuthActionCreators from "./auth";
import * as RegActionCreators from "./register";
import * as SendingCarActionCreators from "./sendingCar";
import * as CartActionCreators from "./cart";
import * as ProfileActionCreators from './profile';


const actions = {

  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
  ...CartActionCreators,
  ...ProfileActionCreators
};
 
export default  actions;
