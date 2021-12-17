import { RecoverPasswordState, RecoverUserActions, RecoverUserActionTypes } from './types';

const initState: RecoverPasswordState = {
	loading: false
}

export const recoverReducer = (state = initState, action: RecoverUserActions) => {
	switch (action.type) {
    case RecoverUserActionTypes.RECOVER_USER:
      return { ...state, loading: true };
    case RecoverUserActionTypes.RECOVER_USER_SUCCESS:
      return { ...state, loading: false };
    case RecoverUserActionTypes.RECOVER_USER_ERROR:
      return { ...state, loading: true };

    default:
      return state;
  }
}