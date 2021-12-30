export enum CartActionTypes {
  SHOW_CART = "SHOW_CART",
  HIDE_CART = "HIDE_CART",
  FETCH_DATA_TO_CART = "DOWNLOAD_DATA_TO_CART",
  ADD_ITEM_TO_CART = "ADD_ITEM_TO_CART",
  UPDATE_CART_ITEM = "UPDATE_CART_ITEM",
  DELETE_CART_ITEM = "DELETE_CART_ITEM",
  UPDATE_COUNT = "UPDATE_COUNT",
  CLEAR_CART_DATA = "CLEAR_CART_DATA",
}

export interface ICarToAdd {
  id: number;
  quantity: number;
}

export interface ICartData {
  id: number;
  productId: number;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
}

export interface CartState {
  cartIsShow: boolean;
  cartData: ICartData[];
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

export interface AddItemToCartAction {
  type: CartActionTypes.ADD_ITEM_TO_CART;
  payload: ICartData;
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

export interface ClearCartData {
  type: CartActionTypes.CLEAR_CART_DATA;
}

export type CartAction =
  | ShowCartAction
  | HideCartAction
  | DownloadDataToCartAction
  | AddItemToCartAction
  | UpdateCartItemAction
  | DeleteCartItemAction
  | UpdateTotalCount
  | ClearCartData;
