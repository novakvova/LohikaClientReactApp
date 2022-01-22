export interface IEditorValues {
  id?: number
  name: string,
  text: string,
  image: string,
  slug: string,
  isShow: true,
  dateTimePublish: string
};

export interface NewsState {
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
