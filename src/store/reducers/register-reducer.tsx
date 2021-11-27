import { RegisterAction, RegisterState, RegisterActionTypes } from "../../types/register";


const initialState: RegisterState = {
  data: '',
  isRegisterd: false,
  error: "",
};

export const registerReducer = ( state = initialState, action: RegisterAction): RegisterState => {
  switch (action.type) {
    case RegisterActionTypes.REGISTER_START:
      return { ...state };

    case RegisterActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isRegisterd: true,
        data: action.payload
      };

    case RegisterActionTypes.REGISTER_ERROR:
      return { ...state, error: action.payload };


    default:
      return state;
  }
};
