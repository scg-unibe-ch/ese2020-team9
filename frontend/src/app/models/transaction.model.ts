export interface Transaction {

  constructor(
      public transactionId: number,
      public productId: number,
      public userId: number,
      public buyerId: number,
      public transactionStatus: number,
      public deliveryFirstName: string,
      public deliveryLastName: string,
      public deliveryStreet: string,
      public deliveryPin: number,
      public deliveryCity: string,
      public deliveryCountry: string,
      public product: string,
      public seller: string,
      public buyer: string,
      public picture?: any,


}

export interface NewTransaction {

  productId: number;
  userId: number;
  buyerId: number;
  deliveryFirstName: string;
  deliveryLastName: string;
  deliveryStreet: string;
  deliveryPin: string;
  deliveryCity: string;
  deliveryCountry: string;

}
