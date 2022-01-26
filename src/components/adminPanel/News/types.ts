import { SearchNews } from "./NewsList/types";


export interface IEditorValues {
  id?: number
  name: string,
  text: string,
  image: string,
  slug: string,
  isShow: boolean,
  dateTimePublish: string
};

export interface NewsState {
  searchNews: SearchNews;
  news: Array<IEditorValues>;
  newsData: IEditorValues;
  images: Array<PhotoObj>;
  loading: boolean;
};

export interface PhotoObj {
  name: string
}

export interface NewsResponse {
  data: Array<IEditorValues>;
  status: number
}
