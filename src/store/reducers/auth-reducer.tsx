import { AuthState,  AuthAction, AuthActionTypes } from '../../types/auth';

// let user = JSON.parse(localStorage.getItem("user")!);


const initialState: AuthState = //user ? { isAuth: true, loading: false, error: '', user }: 
{
      user: {
        email: "",
        image: "",
      },
      isAuth: false,
      loading: false,
      error: '',
    };

export const authReducer = (state=initialState, action: AuthAction) : AuthState => {
    switch (action.type) {
      case AuthActionTypes.LOGIN_AUTH:
        return { ...state, loading: true };

      case AuthActionTypes.LOGIN_AUTH_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuth: true,
          user: { ...action.payload },
        };

      case AuthActionTypes.LOGIN_AUTH_ERROR:
        return { ...state, loading: false, error: action.payload };

      case AuthActionTypes.LOGOUT_AUTH:
        return {isAuth: false, loading: false, error: '', user:{email: '', image:''} };

      default:
        return state;
    }
}