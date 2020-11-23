export class Transaction {

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

    ) {}

}
