import * as CarActionCreators from './car';
import * as SendingCarActionCreators from './sendingCar'
export default {
    ...CarActionCreators,
    ...SendingCarActionCreators
}