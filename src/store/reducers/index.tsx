import { combineReducers } from "redux";
import { carReducer } from "../../comonents/CarsList/car-reducer";
import { authReducer } from "../../comonents/auth/Login/reducer";
import { registerReducer } from "../../comonents/auth/Register/reducer";
import { profileReducer } from '../../comonents/Profile/reducer';
import { usersReducer } from "../../comonents/Users/reducer";
import { sendingCarReducer } from "../../comonents/AddNewCar/addCar-reducer";
import { cartReducer } from "../../comonents/Cart/cart-reduser";
import { fleshMessagesReducer } from '../../comonents/FleshMessages/reducer';
import { userSearchReducer } from '../../comonents/Users/UserSearch/reducer';

export const rootReducer = combineReducers({
  car: carReducer,
  auth: authReducer,
  register: registerReducer,
  sendingCar: sendingCarReducer,
  cart: cartReducer,
  profile: profileReducer,
  userCrud: usersReducer,
  fleshMessages: fleshMessagesReducer,
  userSearch: userSearchReducer
});

export type RootState = ReturnType<typeof rootReducer>;
