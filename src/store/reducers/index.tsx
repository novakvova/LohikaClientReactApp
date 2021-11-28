import { combineReducers } from "redux";
import { carReducer } from "./car-reducer";
import { authReducer } from "./auth-reducer";
import { sendingCarReducer } from "./sendingCar-reducer";

export const rootReducer = combineReducers({
    car: carReducer,
    auth: authReducer,
    sendingCar: sendingCarReducer
});

export type RootState = ReturnType<typeof rootReducer>;