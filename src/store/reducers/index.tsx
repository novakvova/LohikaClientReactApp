import { combineReducers } from "redux";
import { carReducer } from "../../comonents/CarsList/car-reducer";
import { authReducer } from "../../comonents/auth/Login/reducer";
import { registerReducer } from "../../comonents/auth/Register/reducer";
import { sendingCarReducer } from "../../comonents/AddNewCar/addCar-reducer";
import { cartReducer } from "../../comonents/Cart/cart-reduser";
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
