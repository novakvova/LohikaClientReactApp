import { combineReducers } from "redux";
import { carReducer } from "./car-reducer";
import { authReducer } from "./auth-reducer";
<<<<<<< HEAD
import { registerReducer } from './register-reducer'
=======
import { sendingCarReducer } from "./sendingCar-reducer";
>>>>>>> main

export const rootReducer = combineReducers({
    car: carReducer,
    auth: authReducer,
<<<<<<< HEAD
    register: registerReducer
=======
    sendingCar: sendingCarReducer
>>>>>>> main
});

export type RootState = ReturnType<typeof rootReducer>;