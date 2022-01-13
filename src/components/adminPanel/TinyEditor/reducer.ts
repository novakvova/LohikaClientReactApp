import { NewsActions, NewsActionTypes, NewsState } from './types';


const initState: NewsState = {
	news: [],
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

    default:
      return state;
  }
}