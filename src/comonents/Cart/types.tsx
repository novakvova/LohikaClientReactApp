export enum CartActionTypes {
  SHOW_CART = "SHOW_CART",
  HIDE_CART = "HIDE_CART",
  FETCH_DATA_TO_CART = "DOWNLOAD_DATA_TO_CART",
  ADD_CAR_TO_CART = "ADD_CAR_TO_CART",
  UPDATE_CART_ITEM = "UPDATE_CART_ITEM",
  DELETE_CART_ITEM = "DELETE_CART_ITEM",
  UPDATE_COUNT = "UPDATE_COUNT",
}

export interface ICarToAdd {
  id: number | null;
  quantity: number | null;
}

export interface CartState {
  cartIsShow: boolean;
  cartData: Array<any>;
  carAddedToCart: boolean;
  cartModalIsShow: boolean;
  cartUpdated: boolean;
  totalCount: number;
}

export interface ShowCartAction {
  type: CartActionTypes.SHOW_CART;
}

export interface HideCartAction {
  type: CartActionTypes.HIDE_CART;
}
export interface DownloadDataToCartAction {
  type: CartActionTypes.FETCH_DATA_TO_CART;
  payload: Array<any>;
}

export interface AddCartToCartAction {
  type: CartActionTypes.ADD_CAR_TO_CART;
}

export interface UpdateCartItemAction {
  type: CartActionTypes.UPDATE_CART_ITEM;
  payload: ICarToAdd;
}

export interface DeleteCartItemAction {
  type: CartActionTypes.DELETE_CART_ITEM;
  payload: number;
}

export interface UpdateTotalCount {
  type: CartActionTypes.UPDATE_COUNT;
}

export type CartAction =
  | ShowCartAction
  | HideCartAction
  | DownloadDataToCartAction
  | AddCartToCartAction
  | UpdateCartItemAction
  | DeleteCartItemAction
  | UpdateTotalCount;
