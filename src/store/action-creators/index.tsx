import * as CarActionCreators from "./car";
import * as AuthActionCreators from "./auth";
import * as RegActionCreators from "./register";
import * as SendingCarActionCreators from "./sendingCar";
import * as CartActionCreators from "./cart";

export default {
  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
  ...CartActionCreators,
};
