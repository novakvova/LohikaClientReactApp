export enum CreateCategoryActionTypes {
    CREATE_CATEGORY_SUCCESS = "CREATE_CATEGORY_SUCCESS",
  };
  
  export interface ICreateCategory {
    title: string;
    image: FileList[];
    utlSlug: string;
    priority: string;
  };
  
  export type ICreateCategoryError = {
    title: Array<string>;
    utlSlug: Array<string>;
    priority: Array<string>;
  };
  
  export type ICreateCategoryErrors = {
    errors: ICreateCategoryError;
    status: number;
  };
  
  export interface CreateSuccessCategoryAction {
    type: CreateCategoryActionTypes.CREATE_CATEGORY_SUCCESS;
  }
  
  export type CreateCategoryActions = CreateSuccessCategoryAction;