export enum AddNewsActionTypes {
  ADD_NEWS = "ADD_NEWS",
  ADD_NEWS_SUCCESS = "ADD_NEWS_SUCCESS",
  ADD_NEWS_ERROR = "ADD_NEWS_ERROR",
}

export interface AddNews {
  type: AddNewsActionTypes.ADD_NEWS;
}

export interface AddNewsSuccess {
  type: AddNewsActionTypes.ADD_NEWS_SUCCESS;
}

export interface AddNewsError {
  type: AddNewsActionTypes.ADD_NEWS_ERROR;
}

export type AddNewsActions = AddNews | AddNewsSuccess | AddNewsError;