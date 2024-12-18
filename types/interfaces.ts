import { DocumentPickerAsset } from "expo-document-picker";
import { ImagePickerResult } from "expo-image-picker";

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

export interface IResponse {
  status: number;
  data: IUserDB | null;
  error: Error | null | unknown;
  message: string | undefined;
}

export interface IReviews {
  name: string;
  text: string;
  rating: number;
  date: string;
}

export interface IUser {
  email: string;
  password: string;
  name: string;
  surname: string;
  phone: string;
  gender: "male" | "female";
  pushTokens: string[];
}
export interface IUserDB extends IUser {
  address: IUserAddress[];
  cards: IBankCard[];
  stores: IStoreDB[];
  role: "user" | "seller";
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IUserAddress {
  address: string;
  city: string;
  apartment: string;
  home: string;
}

export interface IBankCard {
  cardNumber: string;
  cardHolder: string;
  expirationDate: string;
  cvv: string;
}

export interface IProduct {
  name: string;
  description: string;
  price: string;
  category: {
    main: string;
    sub: string;
    child: string;
  };

  attributes: {
    [key: string]: string[];
  };
  features: {
    [key: string]: string;
  };
  images: IProductImages;
}

export interface IProductDB extends IProduct {
  store: IStoreDB;
  reviews: IReviews[];
  promo: string;
  viewed: number;
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IProductImages {
  main: {
    imageUrl: string;
    imageId: string | null;
  };
  subImages: {
    imageUrl: string;
    imageTag: string | null;
    imageId: string | null;
  }[];
}
export interface IStore {
  name: string;
  address: string;
  phone: string;
  description: string;
}

export interface IStoreDB extends IStore {
  isAvailable: boolean;
  owner: IUser;
  products: IProductDB[];
  point: IPointDB;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPoint {
  name: string;
  phone: string;
  address: string;
  location: {
    lat: number;
    log: number;
  };
}

export interface IPointDB extends IPoint {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
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

export interface ISelectedAttributes {
  [key: string]: string[];
}
export interface ISelectedFeatures {
  [key: string]: string;
}

export interface IFilterSelectorProps {
  attributes: ISelectedAttributes;
  features: ISelectedFeatures;
  setFeatures: (value: ISelectedFeatures) => void;
  setAttributes: (value: ISelectedAttributes) => void;
  selectedCategory: ISelectedCategoryStructure;
}

export interface IOrderTotal {
  products: number;
  delivery: number;
  discount: number;
  summary: number;
}

export interface IProductForOrder extends IProduct {
  store: string;
  reviews: IReviews[];
  viewed: number;
  isActive: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IOrderProductDb {
  product: IProductForOrder;
  count: number;
  selectedAttributes: {
    [key: string]: string;
  };
  accepted: boolean;
}

export interface IOrderDb {
  stores: {
    store: IStoreDB;
    status: "pending" | "ready" | "handOver";
    amount: IOrderTotal;
    products: IOrderProductDb[];
  }[];
  deliveryNote: string;
  sellerNote: string;
  deliveryAddress: IUserAddress;
  status: "pending" | "accepted" | "delivered" | "fullfilled" | "cancelled";
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type IPromoType =
  | "percentage"
  | "buyXgetY"
  | "countPercentage"
  | "together";

export interface IPromotion {
  name: string;
  description: string;
  type: string;

  discountValue: number;
  minCount: number;

  isActive: boolean;
}
export interface IPromotionDB extends IPromotion {
  _id: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
  __v: number;

  // countPercentage və buyXgetY minCount tələb edilir
  // buyXgetY və together discountValue məbləğ endirimidir, countPercentage və percentage faiz endirimi
  // isactive satıcıdan soruşulsun
  // creator mağazadır
  //
}

// export interface IPromoWithProds extends IPromotionDB {
//   products: string[];
// }
