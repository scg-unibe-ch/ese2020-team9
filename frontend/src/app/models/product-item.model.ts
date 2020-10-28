export class ProductItem {

  constructor(
    public productId: number,
    public productName: string,
    public productDescription: string,
    public productImage: string,
    public productPrice: number,
    public productCategory: string,
    public productLocation: string,
    public productDelivery: boolean,
    public uploadDate: Date,
    public sellDate: Date,
    public isApproved: boolean,
    public isService: boolean,
    public isRentable: boolean,
    public isAvailable: boolean,
    public userId: number,
    public userReview: string,
  ) {}

}



