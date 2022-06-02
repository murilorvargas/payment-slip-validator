import { IPaymentSlipProvider } from "../IPaymentSlipProvider";
import { PaymentSlipProvider } from "./PaymentSlipProvider";

let paymentSlipProvider: IPaymentSlipProvider;

describe("Validate Payment Slip", () => {
  beforeEach(() => {
    paymentSlipProvider = new PaymentSlipProvider();
  });

  it("should be able to verify if field is valid", async () => {
    const response = paymentSlipProvider.fieldIsValid("846700000017");

    expect(response).toEqual(true);
  });

  it("should not be able to verify if field is not valid", async () => {
    const response = paymentSlipProvider.fieldIsValid("846700000016");

    expect(response).toEqual(false);
  });

  it("should be able to get bank bar code", async () => {
    const response = paymentSlipProvider.getBarCode({
      payment_slip: "21290001192110001210904475617405975870000002000",
      payment_slip_type: "bank",
    });

    expect(response).toEqual("21299758700000020000001121100012100447561740");
  });

  it("should be able to get dealership bar code", async () => {
    const response = paymentSlipProvider.getBarCode({
      payment_slip: "846700000017435900240209024050002435842210108119",
      payment_slip_type: "dealership",
    });

    expect(response).toEqual("84670000001435900240200240500024384221010811");
  });

  it("should be able to verify if bank bar code is valid", async () => {
    const response = paymentSlipProvider.barCodeIsValid({
      bar_code: "21299758700000020000001121100012100447561740",
      payment_slip_type: "bank",
    });

    expect(response).toEqual(true);
  });

  it("should not be able to verify if bank bar code is not valid", async () => {
    const response = paymentSlipProvider.barCodeIsValid({
      bar_code: "21298758700000020000001121100012100447561740",
      payment_slip_type: "bank",
    });

    expect(response).toEqual(false);
  });

  it("should be able to verify if dealership bar code is valid", async () => {
    const response = paymentSlipProvider.barCodeIsValid({
      bar_code: "84670000001435900240200240500024384221010811",
      payment_slip_type: "dealership",
    });

    expect(response).toEqual(true);
  });

  it("should not be able to verify if dealership bar code is not valid", async () => {
    const response = paymentSlipProvider.barCodeIsValid({
      bar_code: "84660000001435900240200240500024384221010811",
      payment_slip_type: "dealership",
    });

    expect(response).toEqual(false);
  });

  it("should be able to get bank amount", async () => {
    const response = paymentSlipProvider.getAmount({
      payment_slip: "21290001192110001210904475617405975870000002000",
      payment_slip_type: "bank",
    });

    expect(response).toEqual("0000002000");
  });

  it("should be able to get dealership amount", async () => {
    const response = paymentSlipProvider.getAmount({
      payment_slip: "846700000017435900240209024050002435842210108119",
      payment_slip_type: "dealership",
    });

    expect(response).toEqual("00000014359");
  });

  it("should be able to get bank amount", async () => {
    const response = paymentSlipProvider.getExpirationDate({
      payment_slip: "21290001192110001210904475617405975870000002000",
      payment_slip_type: "bank",
    });

    expect(response).toEqual(new Date("2018-07-16T03:00:00.000Z"));
  });

  it("should be able to get dealership amount", async () => {
    const response = paymentSlipProvider.getExpirationDate({
      payment_slip: "846700000017435900240209024050002435842210108119",
      payment_slip_type: "dealership",
    });

    expect(response).toEqual(null);
  });
});
