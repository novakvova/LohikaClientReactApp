import * as CarActionCreators from "./car";
import * as AuthActionCreators from "./auth";
import * as RegActionCreators from "./register";
import * as SendingCarActionCreators from "./sendingCar";
import * as CartActionCreators from "./cart";


const actions = {

  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
  ...CartActionCreators,
};
 
export default  actions;
