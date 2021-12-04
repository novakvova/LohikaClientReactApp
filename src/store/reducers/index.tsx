import { combineReducers } from "redux";
import { carReducer } from "./car-reducer";
import { authReducer } from "../../comonents/auth/Login/reducer";
import { registerReducer } from "../../comonents/auth/Register/reducer";
import { sendingCarReducer } from "./sendingCar-reducer";
import { cartReducer } from "./cart-reduser";
import { profileReducer } from '../../comonents/Profile/reducer';
import { usersReducer } from "../../comonents/Users/reducer";

export const rootReducer = combineReducers({
  car: carReducer,
  auth: authReducer,
  register: registerReducer,
  sendingCar: sendingCarReducer,
  cart: cartReducer,
  profile: profileReducer,
  userCrud: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
