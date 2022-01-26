import { IEditorValues } from '../types';

export enum EditNewsActionTypes {
  EDIT_NEWS = "EDIT_NEWS",
  EDIT_NEWS_SUCCESS = "EDIT_NEWS_SUCCESS",
  EDIT_NEWS_ERROR = "EDIT_NEWS_ERROR",
}

export interface EditNews {
  type: EditNewsActionTypes.EDIT_NEWS;
}

export interface EditNewsSuccess {
  type: EditNewsActionTypes.EDIT_NEWS_SUCCESS;
  payload: IEditorValues;
}

export interface EditNewsError {
  type: EditNewsActionTypes.EDIT_NEWS_ERROR;
}

export type EditNewsActions = EditNews | EditNewsSuccess | EditNewsError;
