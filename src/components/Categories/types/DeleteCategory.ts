export enum DeleteCategoryActionTypes {
    DELETE_CATEGORY = "DELETE_CATEGORY",
    DELETE_CATEGORY_SUCCESS = "DELETE_CATEGORY_SUCCESS",
    DELETE_CATEGORY_ERROR = "DELETE_CATEGORY_ERROR",
  }
  
  export interface DeleteCategoryAction {
    type: DeleteCategoryActionTypes.DELETE_CATEGORY;
  }
  
  export interface DeleteSuccessCategoryAction {
    type: DeleteCategoryActionTypes.DELETE_CATEGORY_SUCCESS;
    payload: number;
  }
  
  export interface DeleteErrorCategoryAction {
    type: DeleteCategoryActionTypes.DELETE_CATEGORY_ERROR;
    payload: string;
  }
  
  export type DeleteCategoryActions =
    | DeleteCategoryAction
    | DeleteSuccessCategoryAction
    | DeleteErrorCategoryAction;
  
  