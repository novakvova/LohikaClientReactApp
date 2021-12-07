import {ProfileState, ProfileActions, ProfileActionTypes} from './types';

const intialState: ProfileState = {
  profile: {
	  id: null,
	  email: '',
	  firstName:'',
	  image: '',
	  phone: ''
  },
  loading: false,
  error: "",
};

export const profileReducer = (state = intialState, action:ProfileActions) => {
	switch (action.type) {
    case ProfileActionTypes.PROFILE:
      return {
        ...state,
        loading: true,
      };

    case ProfileActionTypes.PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        profile: { ...action.payload },
      };
	  
    case ProfileActionTypes.PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return { ...state };
  }
}