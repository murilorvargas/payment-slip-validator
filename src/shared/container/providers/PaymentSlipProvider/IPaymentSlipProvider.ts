interface IPaymentSlipProvider {
  fieldIsValid(field: string): boolean;
  getBarCode(payment_slip: string): string;
  barCodeIsValid(bar_code: string): boolean;
  getAmount(payment_slip: string): string;
  getExpirationDate(expirationFactor: string): Date;
}

export { IPaymentSlipProvider };
