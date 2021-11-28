import * as CarActionCreators from './car';
<<<<<<< HEAD
import * as AuthActionCreators from './auth';
import * as RegActionCreators from './register'
 
export default {
  ...CarActionCreators,
  ...AuthActionCreators,
  ...RegActionCreators,
};
=======
import * as SendingCarActionCreators from './sendingCar'
export default {
    ...CarActionCreators,
    ...SendingCarActionCreators
}
>>>>>>> main
