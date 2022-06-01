interface IPaymentSlipProvider {
  fieldIsValid(field: string): boolean;
  getBarCode(payment_slip: string): string;
  getAmount(payment_slip: string): string;
  getExpirationDate(expirationFactor: string): Date;
}

export { IPaymentSlipProvider };
