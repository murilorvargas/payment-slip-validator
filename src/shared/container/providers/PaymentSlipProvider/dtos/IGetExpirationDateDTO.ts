type IGetExpirationDateDTO = {
  payment_slip: string;
  payment_slip_type: "bank" | "dealership";
};

export { IGetExpirationDateDTO };
