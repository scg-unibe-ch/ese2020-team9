export interface Transaction {


      transactionId: number,
      productId: number,
      userId: number,
      buyerId: number,
      transactionStatus: number,
      deliveryFirstName: string,
      deliveryLastName: string,
      deliveryStreet: string,
      deliveryPin: number,
      deliveryCity: string,
      deliveryCountry: string,
      product: string,
      seller: string,
      buyer: string,
       picture?: any,
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
