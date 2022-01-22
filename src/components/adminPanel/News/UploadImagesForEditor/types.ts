import { PhotoObj } from '../types';

export enum UploadImgActionTypes {
  SET_IMG_SUCCESS = "SET_IMG_SUCCESS",
  SET_IMG_ERROR = "SET_IMG_ERROR",
  SET_IMG = "SET_IMG",
}

export interface SetImg {
  type: UploadImgActionTypes.SET_IMG;
}

export interface SetImgSuccess {
  type: UploadImgActionTypes.SET_IMG_SUCCESS;
  payload: Array<PhotoObj>;
}

export interface SetImgError {
  type: UploadImgActionTypes.SET_IMG_ERROR;
}

export type UploadImgActions = SetImg | SetImgSuccess | SetImgError;
