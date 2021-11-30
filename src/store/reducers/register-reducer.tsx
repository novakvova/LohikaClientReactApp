import { RegisterAction, RegisterState, RegisterActionTypes } from "../../types/register";


const initialState: RegisterState = {
  data: '',
  isRegisterd: false,
  error: "",
  loading: false
};

export const registerReducer = ( state = initialState, action: RegisterAction): RegisterState => {
  switch (action.type) {
    case RegisterActionTypes.REGISTER_START:
      return { 
        ...state,
        loading: true
       };

    case RegisterActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterd: true,
        data: action.payload, 
        loading: false
      };

    case RegisterActionTypes.REGISTER_ERROR:
      return { 
        ...state, 
        error: action.payload };


    default:
      return state;
  }
};
