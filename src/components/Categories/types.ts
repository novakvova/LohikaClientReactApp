export interface IStatus {
    status: number
  }
  
  export interface CategoryInfo {
    id: number;
    title: string;
    urlSlug: string;
    image: string;
    priority: number | string;
  }
  
  export interface CategoriesState {
    categories: CategoryInfo[];
    categoryData: CategoryInfo;
    loading: boolean;
    error: string | null;
    currentPage: number;
    pages: number;
    total: number;
  }

  export interface Product {
    categoryName: string,
    id: number,
    images: string[],
    name: string,
    price: number,
    priority: number,
  }

  export interface PaginatedProductsList {
    currentPage: number,
    pages: number,
    products: Product[],
    total: number
  }