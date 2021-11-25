import { combineReducers } from "redux";
import { carReducer } from "./car-reducer";
import { authReducer } from "./auth-reducer";

export const rootReducer = combineReducers({
    car: carReducer,
    auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;