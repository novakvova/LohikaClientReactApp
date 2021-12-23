import { CategoryState, AddCategoriesAction, AddCategoryTypes } from "./types";


const initialState: CategoryState = {
    category: {title: "", priority: 0, urlSlug: "" , image: ""},
    loading: false,
    error: ""
}

export const categoryReducer =(state = initialState, action: AddCategoriesAction)=>{
    switch (action.type) {
        case AddCategoryTypes.ADD_CATEGORY:
            return{
                ...state,
                loading: true,
            };
        case AddCategoryTypes.ADD_CATEGORY_SUCCESS:
            return{
                ...state,
                loading: false,
                category: action.payload
            }
        case AddCategoryTypes.ADD_CATEGORY_ERROR:
            return{
                ...state, loading: false, error: "Some error"
            }
    
        default:
            return state;
    }
}