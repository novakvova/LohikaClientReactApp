import * as CarActionCreators from './car';
import * as AuthActionCreators from './auth'
 
export default {
  ...CarActionCreators,
  ...AuthActionCreators,
};