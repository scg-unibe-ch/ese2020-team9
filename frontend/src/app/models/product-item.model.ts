export interface ProductItem {

  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImage: string,
  productCategory: string;
  productLocation: string;
  productDelivery: boolean;
  uploadDate: Date;
  sellDate: Date;
  isApproved: boolean;
  isService: boolean;
  isRentable: boolean;
  isAvailable: boolean;
  userId: number;
  userReview: string;

}



