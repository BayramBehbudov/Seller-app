import { Models } from "react-native-appwrite";

export interface ISeller {
  name: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  description: string;
  point: string;
}

export interface ICategories {
  [key: string]: ICategoriesValue;
}

export interface ICategoriesValue {
  title: string;
  filters: ICategorieFilters[];
  features: IFeatures[];
  subs: ISubCategory;
}

export interface ISubCategory {
  [key: string]: ISubCategoryValue;
}

export interface ISubCategoryValue {
  title: string;
  filters: ICategorieFilters[];
  features: IFeatures[];
  child: IChildCategory;
}

export interface IChildCategory {
  [key: string]: {
    title: string;
    filters: ICategorieFilters[];
    features: IFeatures[];
  };
}
export interface IFeatures {
  title: string;
  value: string[];
}

export interface ICategorieFilters {
  title: string;
  value: string[];
}

export interface IProduct extends Models.Document {
  name: string;
  description: string;
  price: string;
  category: {
    main: string;
    sub: string;
    child: string;
  };
  isActive: boolean;
  images: IProductImages;
  filters: {
    [key: string]: string[];
  };
  features: {
    [key: string]: string;
  };
}

export interface IProductDb {
  category: string;
  filters: string;
  features: string;
  images: string;
  isActive: boolean;
  name: string;
  description: string;
  price: string;
}
export interface IProductImages {
  main: string;
  subImages: {
    imageId: string;
    imageTag: string | null;
  }[];
}

export interface ISelectedCategoryStructure {
  main: {
    title: string;
    id: string;
    subs: any;
    filters: ICategorieFilters[];
    features: IFeatures[];
  };
  sub: {
    title: string;
    id: string;
    child: any;
    filters: ICategorieFilters[];
    features: IFeatures[];
  };
  child: {
    title: string;
    id: string;
    filters: ICategorieFilters[];
    features: IFeatures[];
  };
}

export interface IPickerAssests {
  uri: string;
  name: string;
  size: number;
  mimeType: string;
  imageId: string;
}

export interface ISelectedImages {
  main: IPickerAssests;
  subImages: { image: IPickerAssests; imageTag: string | null }[];
}

export interface ISelectedFilters {
  title: string;
  value: string[];
}
export interface ISelectedFeatures {
  title: string;
  value: string;
}
export interface IOrderProduct extends IProduct {
  count: number;
  selectedAtributes: { [key: string]: string };
}

export interface IOrder {
  $id: string;
  products: IOrderProduct[];
  sellerNote: string;
  createdAt: string;
  status: string;
}
export type IResponseData = Models.Document | Models.Document[] | undefined;

export interface IResponse {
  status: number;
  data: IResponseData;
  error: Error | null | unknown;
  message: string | null;
}

export interface IFilterSelectorProps {
  filters: ISelectedFilters[];
  features: ISelectedFeatures[];
  setFeatures: (value: ISelectedFeatures[]) => void;
  setFilters: (value: ISelectedFilters[]) => void;
  selectedCategory: ISelectedCategoryStructure;
}
