import * as CarActionCreators from './car';
import * as AuthActionCreators from './auth';
import * as RegActionCreators from './register';
import * as SendingCarActionCreators from './sendingCar'

const actions = {
  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
  ...SendingCarActionCreators,
};
 
export default  actions;
