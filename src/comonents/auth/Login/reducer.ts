import { AuthState,  AuthAction, AuthActionTypes } from './types';


const initialState: AuthState = {
      user: {
        email: "",
        image: "",
      },
      isAuth: false,
};

export const authReducer = (state=initialState, action: AuthAction) : AuthState => {
    switch (action.type) {

      case AuthActionTypes.LOGIN_AUTH_SUCCESS:
        return {
          ...state,
          isAuth: true,
          user: { ...action.payload },
        };

      case AuthActionTypes.LOGOUT_AUTH:
        return {isAuth: false, user:{email: '', image:''} };

      default:
        return state;
    }
}