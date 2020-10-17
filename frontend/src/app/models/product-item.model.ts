export class ProductItem {
constructor(
    public productId: number;
    public productName: string;
    public productDescription: string;
    public productImage: HTMLImageElement;
    public productPrice: number;
    public productCategory: string;
    public productLocation: string;
    public uploadDate: Date;
    public sellDate: Date;
    public approved: boolean;
    public isService: boolean;
    public isLend: boolean;
    public isAvailable: boolean;
    public userId: number;
    public userName: String;
    public userReview: string;
  ) {}

}

