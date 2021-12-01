import { ProfileActions, ProfileActionTypes, IProfile } from './../../types/profile';
import { Dispatch } from 'react';
import http from '../../http_common';


export const GetProfileData = () => async (dispatch: Dispatch<ProfileActions>) => {
	try {
		dispatch({type: ProfileActionTypes.PROFILE});
		const response = await http.get("api/Account/profile");
		const data:IProfile = await response.data;
		dispatch({
			type: ProfileActionTypes.PROFILE_SUCCESS,
			payload: {...data}
		})
	} catch (error: any) {
		dispatch({
			type: ProfileActionTypes.PROFILE_ERROR,
			payload: error
		});
	}
}