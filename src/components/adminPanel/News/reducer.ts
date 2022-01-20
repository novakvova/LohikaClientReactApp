import { NewsActions, NewsActionTypes, NewsState } from './types';


const initState: NewsState = {
	news: [],
  images: [],
	loading: false
}

export const newsReducer = (state = initState, action: NewsActions) => {
	switch (action.type) {
    case NewsActionTypes.ADD_NEWS:
      return { ...state, loading: true };
    case NewsActionTypes.ADD_NEWS_SUCCESS:
      return { ...state, loading: false };
    case NewsActionTypes.ADD_NEWS_ERROR:
      return { ...state, loading: false };

    case NewsActionTypes.GET_NEWS:
      return { ...state, loading: true };
    case NewsActionTypes.GET_NEWS_SUCCESS:
      return { ...state, news: action.payload, loading: false };
    case NewsActionTypes.GET_NEWS_ERROR:
      return { ...state, loading: false };

    case NewsActionTypes.SET_IMG:
      return { ...state, loading: true };
    case NewsActionTypes.SET_IMG_SUCCESS:
      return {
        ...state,
        images: [...state.images, ...action.payload],
        loading: false,
      };
    case NewsActionTypes.SET_IMG_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
}