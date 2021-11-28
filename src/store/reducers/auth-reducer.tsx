import { AuthState,  AuthAction, AuthActionTypes } from '../../types/auth';

const initialState: AuthState = {
    user: {
        email:"",
        image: ""
    },
    isAuth: false,
    loading: false,
    error: null
}

export const authReducer = (state=initialState, action: AuthAction) : AuthState => {
    switch(action.type) {

        case AuthActionTypes.LOGIN_AUTH:
            return { ...state, loading: true};
        
        case AuthActionTypes.LOGIN_AUTH_SUCCESS:
            return { ...state, loading: false, isAuth:true, user: action.payload};

        case AuthActionTypes.LOGIN_AUTH_ERROR:
            return { ...state, loading: false, error: action.payload};

        default:
            return state;
    }
}