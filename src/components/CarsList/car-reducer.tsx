import { CarState, CarAction, CarActionTypes } from "./types";

const initialState: CarState = {
  loading: false,
  carSearchedById: {
    id: 0,
    name: "",
    priority: 0,
    image: "",
    price: 0,
    images: [],
    categoryId: 0,
    categoryName: "",
  },
  products: [],
  currentPage: 1,
  pages: 0,
  total: 0,
  error: null,
  uploadCarImageId: [],
};

export const carReducer = (
  state = initialState,
  action: CarAction
): CarState => {
  switch (action.type) {
    case CarActionTypes.SEARCH_CARS:
      return { ...state, ...action.payload };

    case CarActionTypes.GET_CAR_BY_ID:
      return { ...state, carSearchedById: action.payload };

    case CarActionTypes.DELETE_CAR:
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};
