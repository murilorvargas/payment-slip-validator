interface IPaymentSlipProvider {
  fieldIsValid(field: string): boolean;
  getExpirationDate(expirationFactor: string): Date;
}

export { IPaymentSlipProvider };
