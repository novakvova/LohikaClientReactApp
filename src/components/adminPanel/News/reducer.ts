import { GetSearchNewsActions, GetSearchNewsActionTypes } from './NewsList/types';
import { AddNewsActions, AddNewsActionTypes} from './AddNews/types';
import { DelNewsActionTypes, DelNewsActions } from './DelNews/types';
import { EditNewsActionTypes, EditNewsActions } from "./EditNews/types";
import { GetInfoNewsActionTypes, GetInfoNewsNewsActions } from './NewsInfo/types';
import { GetNewsActions, GetNewsActionTypes } from './NewsOnHomePage/types';
import { IEditorValues, NewsState } from './types';
import { UploadImgActions, UploadImgActionTypes } from './UploadImagesForEditor/types';

const newsData: IEditorValues = {
  name: "",
  text: "",
  image: "",
  slug: "",
  isShow: false,
  dateTimePublish: "",
};


const initState: NewsState = {
  searchNews:{
    products: [],
    total: 0,
    currentPage: 0,
    pages: 0
  },
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
    | EditNewsActions
    | DelNewsActions
    | GetSearchNewsActions
) => {
  
  switch (action.type) {
    /* ADD NEWS */
    case AddNewsActionTypes.ADD_NEWS:
      return { ...state, loading: true };
    case AddNewsActionTypes.ADD_NEWS_SUCCESS:
      return { ...state, images: [], loading: false };
    case AddNewsActionTypes.ADD_NEWS_ERROR:
      return { ...state, loading: false };

    /*Edit news */
    case EditNewsActionTypes.EDIT_NEWS:
      return { ...state, loading: true };
    case EditNewsActionTypes.EDIT_NEWS_SUCCESS:
      return {
        ...state,
        news: changeNews(state.news, action.payload),
        loading: false,
      };
    case EditNewsActionTypes.EDIT_NEWS_ERROR:
      return { ...state, loading: false };

    /*Delete news */
    case DelNewsActionTypes.DEL_NEWS:
      return { ...state, loading: true };
    case DelNewsActionTypes.DEL_NEWS_SUCCESS:
      return {
        ...state,
        news: state.news.filter((el) => el.id !== action.payload),
        loading: false,
      };
    case DelNewsActionTypes.DEL_NEWS_ERROR:
      return { ...state, loading: false };

    /*Get all news info */
    case GetNewsActionTypes.GET_NEWS:
      return { ...state, loading: true };
    case GetNewsActionTypes.GET_NEWS_SUCCESS:
      return { ...state, news: action.payload, loading: false };
    case GetNewsActionTypes.GET_NEWS_ERROR:
      return { ...state, loading: false };

    case GetSearchNewsActionTypes.GET_SEARCH_NEWS:
      return { ...state, loading: true };
    case GetSearchNewsActionTypes.GET_SEARCH_NEWS_SUCCESS:
      return { ...state, searchNews: action.payload, loading: false };
    case GetSearchNewsActionTypes.GET_SEARCH_NEWS_ERROR:
      return { ...state, loading: false };

    /*Upload inage for Editor */
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

    /*Get news Info */
    case GetInfoNewsActionTypes.GET_INFO:
      return { ...state, loading: true };
    case GetInfoNewsActionTypes.GET_INFO_SUCCESS:
      return { ...state, newsData: action.payload, loading: false };
    case GetInfoNewsActionTypes.GET_INFO_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

const changeNews = (state: IEditorValues[], data: IEditorValues): IEditorValues[] => {
  const idx: number = state.findIndex(({ id }) => id === data.id);
  return [...state.slice(0, idx), data, ...state.slice(idx + 1)];
};
