import { AddNewsActions, AddNewsActionTypes } from './AddNews/types';
import { GetInfoNewsActionTypes, GetInfoNewsNewsActions } from './NewsInfo/types';
import { GetNewsActions, GetNewsActionTypes } from './NewsOnHomePage/types';
import { IEditorValues, NewsState } from './types';
import { UploadImgActions, UploadImgActionTypes } from './UploadImagesForEditor/types';

const newsData: IEditorValues = {
  name: "",
  text: "",
  image: "",
  slug: "",
  isShow: true,
  dateTimePublish: "",
};


const initState: NewsState = {
	news: [],
  images: [],
  newsData,
	loading: false
}

export const newsReducer = (
  state = initState,
  action:
    | UploadImgActions
    | AddNewsActions
    | GetNewsActions
    | GetInfoNewsNewsActions
) => {
  
  switch (action.type) {
    case AddNewsActionTypes.ADD_NEWS:
      return { ...state, loading: true };
    case AddNewsActionTypes.ADD_NEWS_SUCCESS:
      return { ...state, images: [], loading: false };
    case AddNewsActionTypes.ADD_NEWS_ERROR:
      return { ...state, loading: false };

    case GetNewsActionTypes.GET_NEWS:
      return { ...state, loading: true };
    case GetNewsActionTypes.GET_NEWS_SUCCESS:
      return { ...state, news: action.payload, loading: false };
    case GetNewsActionTypes.GET_NEWS_ERROR:
      return { ...state, loading: false };

    case UploadImgActionTypes.SET_IMG:
      return { ...state, loading: true };
    case UploadImgActionTypes.SET_IMG_SUCCESS:
      return {
        ...state,
        images: [...state.images, ...action.payload],
        loading: false,
      };
    case UploadImgActionTypes.SET_IMG_ERROR:
      return { ...state, loading: false };

    case GetInfoNewsActionTypes.GET_INFO:
      return { ...state, loading: true };
    case GetInfoNewsActionTypes.GET_INFO_SUCCESS:
      return { ...state, newsData:action.payload, loading: false };
    case GetInfoNewsActionTypes.GET_INFO_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};