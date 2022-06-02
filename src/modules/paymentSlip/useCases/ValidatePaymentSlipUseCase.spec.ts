import { PaymentSlipProvider } from "../../../shared/container/providers/PaymentSlipProvider/implementations/PaymentSlipProvider";
import { IPaymentSlipProvider } from "../../../shared/container/providers/PaymentSlipProvider/IPaymentSlipProvider";
import { AppError } from "../../../shared/errors/AppError";
import { ValidatePaymentSlipUseCase } from "./ValidatePaymentSlipUseCase";

let validatePaymentSlipUseCase: ValidatePaymentSlipUseCase;
let paymentSlipProvider: IPaymentSlipProvider;

describe("Validate Payment Slip", () => {
  beforeEach(() => {
    paymentSlipProvider = new PaymentSlipProvider();
    validatePaymentSlipUseCase = new ValidatePaymentSlipUseCase(
      paymentSlipProvider
    );
  });

  it("should be able to validate a bank payment slip", async () => {
    const response = await validatePaymentSlipUseCase.execute({
      payment_slip: "21290001192110001210904475617405975870000002000",
    });

    expect(response).toHaveProperty("barCode");
    expect(response).toHaveProperty("amount");
    expect(response).toHaveProperty("expirationDate");
  });

  it("should be able to validate a dealership payment slip", async () => {
    const response = await validatePaymentSlipUseCase.execute({
      payment_slip: "846700000017435900240209024050002435842210108119",
    });

    expect(response).toHaveProperty("barCode");
    expect(response).toHaveProperty("amount");
    expect(response).toHaveProperty("expirationDate");
  });

  it("should not be able to validate a bank payment slip if field is invalid", async () => {
    await expect(
      validatePaymentSlipUseCase.execute({
        payment_slip: "21290001122110001210904475617405975870000002000",
      })
    ).rejects.toEqual(
      new AppError({
        code: "invalid.line",
        statusCode: 400,
        message: "Linha digitável invalida",
      })
    );
  });

  it("should not be able to validate a dealership payment slip if field is invalid", async () => {
    await expect(
      validatePaymentSlipUseCase.execute({
        payment_slip: "846700000016435900240209024050002435842210108119",
      })
    ).rejects.toEqual(
      new AppError({
        code: "invalid.line",
        statusCode: 400,
        message: "Linha digitável invalida",
      })
    );
  });

  it("should not be able to validate a bank payment slip if bar code is invalid", async () => {
    await expect(
      validatePaymentSlipUseCase.execute({
        payment_slip: "21290001192110001210904475617405875870000002000",
      })
    ).rejects.toEqual(
      new AppError({
        code: "invalid.line",
        statusCode: 400,
        message: "Linha digitável invalida",
      })
    );
  });
});
