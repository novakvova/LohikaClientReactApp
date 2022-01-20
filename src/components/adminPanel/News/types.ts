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
  news: Array<IEditorValues>;
  images: Array<PhotoObj>;
  loading: boolean;
};

export interface PhotoObj {
  name: string
}

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
  SET_IMG_SUCCESS = "SET_IMG_SUCCESS",
  SET_IMG_ERROR = "SET_IMG_ERROR",
  SET_IMG = "SET_IMG",
};

export interface SetImg {
  type: NewsActionTypes.SET_IMG
}

export interface SetImgSuccess {
  type: NewsActionTypes.SET_IMG_SUCCESS;
  payload: Array<PhotoObj>;
}

export interface SetImgError {
  type: NewsActionTypes.SET_IMG_ERROR;
}

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
  | GetNewsError
  | SetImg
  | SetImgSuccess
  | SetImgError;