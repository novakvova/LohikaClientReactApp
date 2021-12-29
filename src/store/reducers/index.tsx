import { combineReducers } from "redux";
import { carReducer } from "../../components/CarsList/car-reducer";
import { authReducer } from "../../components/auth/Login/reducer";
import { registerReducer } from "../../components/auth/Register/reducer";
import { profileReducer } from '../../components/Profile/reducer';
import { usersReducer } from "../../components/adminPanel/Users/reducer";
import { sendingCarReducer } from "../../components/CarsList/AddNewCar/addCar-reducer";
import { cartReducer } from "../../components/Cart/cart-reduser";
import { fleshMessagesReducer } from '../../components/FleshMessages/reducer';
import {categoryReducer} from '../../components/Categories/AddNewCategory/AddCategory-reducer';
export const rootReducer = combineReducers({
  car: carReducer,
  auth: authReducer,
  register: registerReducer,
  sendingCar: sendingCarReducer,
  cart: cartReducer,
  profile: profileReducer,
  userCrud: usersReducer,
  fleshMessages: fleshMessagesReducer,
  category: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
