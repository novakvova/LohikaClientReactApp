import * as CarActionCreators from './car';
import * as AuthActionCreators from './auth';
import * as RegActionCreators from './register'
 
export default {
  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
};