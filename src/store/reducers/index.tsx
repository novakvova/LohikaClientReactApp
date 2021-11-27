import { combineReducers } from "redux";
import { carReducer } from "./car-reducer";
import { authReducer } from "./auth-reducer";
import { registerReducer } from './register-reducer'

export const rootReducer = combineReducers({
    car: carReducer,
    auth: authReducer,
    register: registerReducer
});

export type RootState = ReturnType<typeof rootReducer>;