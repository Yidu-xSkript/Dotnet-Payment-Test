export class PaymentDetail {
  id: string;
  cardHolderName: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  created_at: Date;
  constructor(
    id: string,
    cardHolderName: string,
    cardNumber: string,
    expirationDate: string,
    cvv: string,
    created_at: Date
  ) {
    this.id = id;
    this.cardHolderName = cardHolderName;
    this.expirationDate = expirationDate;
    this.cardNumber = cardNumber;
    this.cvv = cvv;
    this.created_at = new Date(created_at);
  }
}
