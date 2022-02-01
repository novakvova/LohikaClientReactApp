export enum ProfileActionTypes {
  PROFILE = "PROFILE",
  PROFILE_SUCCESS = "PROFILE_SUCCESS",
  PROFILE_ERROR = "PROFILE_ERROR",
}

export interface IProfile {
  id: number | null;
  email: string;
  firstName:string;
  secondName: string
  photo: string;
  phone: string
}


export interface ProfileAction {
  type: ProfileActionTypes.PROFILE;
}

export interface LoginAuthSuccessAction {
  type: ProfileActionTypes.PROFILE_SUCCESS;
  payload: IProfile;
}

export interface LoginAuthErrorAction {
  type: ProfileActionTypes.PROFILE_ERROR;
  payload: string;
}

export type ProfileActions =
  | ProfileAction
  | LoginAuthSuccessAction
  | LoginAuthErrorAction;
