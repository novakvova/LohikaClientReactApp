import { combineReducers } from "redux";
import { carReducer } from "./car-reducer";
import { authReducer } from "./auth-reducer";
import { registerReducer } from "./register-reducer";
import { sendingCarReducer } from "./sendingCar-reducer";
import { cartReducer } from "./cart-reduser";
import { profileReducer } from './profile-reducer';
import { usersReducer } from "./user-reducer";

export const rootReducer = combineReducers({
  car: carReducer,
  auth: authReducer,
  register: registerReducer,
  sendingCar: sendingCarReducer,
  cart: cartReducer,
  profile: profileReducer,
  users: usersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
