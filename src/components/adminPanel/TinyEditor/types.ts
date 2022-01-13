export interface IEditorValues {
  id?: number
  name: string,
  text: string,
  image: string,
  slug: string,
  isShow: true,
  dateTimePublish: string
};

export interface NewsState {
  news:Array<IEditorValues>
  loading: boolean
};

export interface NewsResponse {
  data: Array<IEditorValues>;
  status: number
}

export enum NewsActionTypes {
  ADD_NEWS = "ADD_NEWS",
  ADD_NEWS_SUCCESS = "ADD_NEWS_SUCCESS",
  ADD_NEWS_ERROR = "ADD_NEWS_ERROR",
  GET_NEWS = "GET_NEWS",
  GET_NEWS_SUCCESS = "GET_NEWS_SUCCESS",
  GET_NEWS_ERROR = "GET_NEWS_ERROR",
};

export interface AddNews  {
  type: NewsActionTypes.ADD_NEWS
};

export interface AddNewsSuccess {
  type: NewsActionTypes.ADD_NEWS_SUCCESS;
}

export interface AddNewsError {
  type: NewsActionTypes.ADD_NEWS_ERROR;
}

export interface GetNews {
  type: NewsActionTypes.GET_NEWS;
}

export interface GetNewsSuccess {
  type: NewsActionTypes.GET_NEWS_SUCCESS;
  payload: Array<IEditorValues>
}

export interface GetNewsError {
  type: NewsActionTypes.GET_NEWS_ERROR;
}

export type NewsActions =
  | AddNews
  | AddNewsSuccess
  | AddNewsError
  | GetNews
  | GetNewsSuccess
  | GetNewsError;