type IBarCodeIsValidDTO = {
  bar_code: string;
  payment_slip_type: "bank" | "dealership";
};

export { IBarCodeIsValidDTO };
