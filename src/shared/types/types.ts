export type TMainResponse = {
  Best: IProduct[];
  New: IProduct[];
};

export interface IListResponse {
  cnt: number;
  products: IProduct[];
  userLike: number[];
}

export interface IAdResponse extends IListResponse {
  adProducts: IProduct[];
}

export interface IDetailResponse {
  k_No: number;
  userLike: boolean;
  product: IProductDetail;
}

export interface IReviewsResponse {
  p_review: number;
  reviews: TReviews;
}

export type TError = { errorMessage: string };

export interface IProduct {
  p_No: number;
  p_Category: string;
  p_Thumbnail: string[];
  a_Brand: string;
  p_Name: string;
  p_Cost: number;
  p_Sale: boolean;
  p_Discount: number;
  p_Option: TOption[];
  p_Soldout?: boolean;
  p_Best: boolean;
  p_New: boolean;
  p_Like?: number;
  p_Review?: number;
  p_Desc?: string;
}

export interface IProductDetail extends IProduct {
  p_Cnt: number;
  p_Content: string;
}

export type TOption = [string, string, string, number, number];
export type TUserOption = [string, string, string, number, number, number];

export interface IReview {
  createdAt: string;
  r_Content: string;
  r_No: number;
  r_Score: number;
  u_Id: string;
}
export type TReviews = IReview[];

export interface ICartList {
  p_No: number;
  p_Category: string;
  p_Thumbnail: string[];
  a_Brand: string;
  p_Name: string;
  p_Cost: number;
  p_Sale: boolean;
  p_Discount: number;
  p_Option: TUserOption[];
  k_No: number;
  p_Price: number;
  p_Cnt: number;
}
export interface ICartResponse {
  cartList: ICartList[];
  o_Price: number;
}

//마이페이지
export interface IMyProduct extends IProduct {
  o_Status: string;
  p_Cnt: number;
  p_Price: number;
  r_Status: boolean;
  p_Status: boolean;
  k_No: null;
}

export interface IList {
  o_Date: string;
  o_No: number;
  o_Price: number;
  products: IMyProduct[];
}
export interface IAPIResOrder {
  cnt: number;
  orderList: IList[];
}
interface IAPIResCancel {
  cnt: number;
  cancelList: IList[];
}
//마이페이지 - 주문조회,취소조회
export type TMyAPIResOrder = IAPIResOrder | IAPIResCancel;

// 임시로 사용하는 공통 프로덕트 타입
export interface IProductTemp {
  p_No: number;
  p_Thumbnail: string[];
  p_Category: string;
  a_Brand: string;
  p_Name: string;
  p_Cost: number;
  p_Sale: boolean;
  p_Discount: number;
}

export interface IProductPayment extends IProductTemp {
  k_No: number;
  p_Option: TUserOption[];
  p_Price: number;
  p_Cnt: number;
}

type TUserInfo = {
  u_Name: string;
  u_Phone: string;
  u_Address1: string;
  u_Address2: string;
  u_Address3: string;
};
type TAddressList = {
  d_No: number;
  u_Idx: number;
  d_Name: string;
  d_Phone: string;
  d_Address1: string;
  d_Address2: string;
  d_Address3: string;
};
export interface IPaymentResponse {
  userInfo: TUserInfo;
  addressList: TAddressList[];
  products: IProductPayment[];
  o_Price: number;
}
export interface ICompleteResponse {
  o_No: number;
  d_Name: string;
  d_Phone: string;
  d_Address1: string;
  d_Address2: string;
  d_Address3: string;
  cartStatus: number;
}
