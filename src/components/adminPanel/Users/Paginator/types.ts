export interface ISearch {
  id?: string;
  firstName?: string;
  secondName?: string;
  phone?: string;
  email?: string;
  page?: string;
};


export interface IPaginateState {
  search: ISearch;
  currentPage: number;
  pages?: number;
  total?: number;
  error?: string;
  loading: boolean
};

export enum PaginateActionTypes {
  PAGINATE = "PAGINATE",
  PAGINATE_INIT = "PAGINATE_INIT",
  PAGINATE_SUCCESS = "PAGINATE_SUCCESS",
  PAGINATE_ERROR = "PAGINATE_ERROR",
};

export interface PaginateAction {
	type:PaginateActionTypes.PAGINATE;
};
export interface PaginateInitAction {
  type: PaginateActionTypes.PAGINATE_INIT;
  payload: number;
};

export interface PaginateSuccessAction {
  type: PaginateActionTypes.PAGINATE_SUCCESS;
  payload: ISearch;
};

export interface PaginateErrorAction {
  type: PaginateActionTypes.PAGINATE_ERROR;
  payload: string
};

export type PaginateActions =
  | PaginateAction
  | PaginateSuccessAction
  | PaginateErrorAction
  | PaginateInitAction;