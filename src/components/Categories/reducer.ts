import { CategoriesState, CategoryInfo } from "./types";
import { CreateCategoryActionTypes, CreateCategoryActions } from "./types/CreateCategory";
import { CategoriesActions, CategoriesActionTypes } from "./types/GetAllCategories";
import { DeleteCategoryActions, DeleteCategoryActionTypes } from "./types/DeleteCategory";
import { UpdateCategoryActionTypes, UpdateCategoryActions } from "./types/UpdateCategory";
import { GetCategoryActionTypes, GetCategoryActions } from "./types/GetCategoryByID";
import { ISearchCategoryAction, ISearchCategoryActionTypes } from './types/SearchCategories';

  const category: CategoryInfo = {
    id: 0,
    title: "",
    urlSlug: "",
    priority: "",
    image: "",
  };

const initialState: CategoriesState = {
  categories: [],
  categoryData: category,
  loading: false,
  error: null,
  currentPage: 1,
  pages: 1,
  total: 0
};


export const categoryReducer = (
  state = initialState,
  action: 
    | CategoriesActions
    | DeleteCategoryActions
    | GetCategoryActions
    | UpdateCategoryActions
    | CreateCategoryActions
    | ISearchCategoryAction
) => {
  switch (action.type) {
    case CategoriesActionTypes.FETCH_CATEGORIES:
      return { ...state, loading: true };

    case CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case CategoriesActionTypes.FETCH_CATEGORIES_ERROR:
      return { ...state, loading: false, error: action.payload };

    case DeleteCategoryActionTypes.DELETE_CATEGORY:
      return { ...state, loading: true };

    case DeleteCategoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: state.categories.filter(({ id }) => id !== action.payload),
      };

    case DeleteCategoryActionTypes.DELETE_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    case GetCategoryActionTypes.GET_CATEGORY:
      return { ...state, loading: true };

    case GetCategoryActionTypes.GET_CATEGORY_SUCCESS:
      return { ...state, loading: false, categoryData: action.payload };

    case GetCategoryActionTypes.GET_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    case UpdateCategoryActionTypes.UPDATE_CATEGORY:
      return { ...state, loading: true };

    case UpdateCategoryActionTypes.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: changeCategory(state.categories, action.payload),
      };

    case UpdateCategoryActionTypes.UPDATE_CATEGORY_ERROR:
      return { ...state, loading: false, error: action.payload };

    case CreateCategoryActionTypes.CREATE_CATEGORY_SUCCESS:
      return { ...state };

    case ISearchCategoryActionTypes.SEARCH_CATEGORIES:
      return { ...state, loading: true };

    case ISearchCategoryActionTypes.SEARCH_CATEGORIES_SUCCESS:
      return { ...state, ...action.payload, loading: false };

    case ISearchCategoryActionTypes.SEARCH_CATEGORIES_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};


const changeCategory = (state: CategoryInfo[], data: CategoryInfo): CategoryInfo[] => {
  const idx: number = state.findIndex(({id}) => id === data.id);
  return [...state.slice(0, idx), data, ...state.slice(idx + 1)]
};

