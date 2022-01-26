

export enum DelNewsActionTypes {
  DEL_NEWS = "DEL_NEWS",
  DEL_NEWS_SUCCESS = "DEL_NEWS_SUCCESS",
  DEL_NEWS_ERROR = "DEL_NEWS_ERROR",
}

export interface DelNews {
  type: DelNewsActionTypes.DEL_NEWS;
}

export interface DelNewsSuccess {
  type: DelNewsActionTypes.DEL_NEWS_SUCCESS;
  payload: number
}

export interface DelNewsError {
  type: DelNewsActionTypes.DEL_NEWS_ERROR;
}

export type DelNewsActions = DelNews | DelNewsSuccess | DelNewsError;

export interface DelResponse {
  status: number
}