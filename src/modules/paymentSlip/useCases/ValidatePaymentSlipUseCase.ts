import { inject, injectable } from "tsyringe";

import { IPaymentSlipProvider } from "../../../shared/container/providers/PaymentSlipProvider/IPaymentSlipProvider";
import { AppError } from "../../../shared/errors/AppError";
import { formatDateYYYYMMDD } from "../../../utils/formatDateYYYYMMDD";
import { formatMoneyToBRL } from "../../../utils/formatMoneyToBRL";
import { Category } from "../model/PaymentSlip";

interface IRequest {
  payment_slip: string;
}

@injectable()
class ValidatePaymentSlipUseCase {
  constructor(
    @inject("PaymentSlipProvider")
    private paymentSlipProvider: IPaymentSlipProvider
  ) {}
  async execute({ payment_slip }: IRequest): Promise<Category> {
    const payment_slip_type =
      payment_slip.length === 47 ? "bank" : "dealership";

    if (payment_slip_type === "bank") {
      const fieldOneIsValid = this.paymentSlipProvider.fieldIsValid(
        payment_slip.substr(0, 10)
      );

      const fieldTwoIsValid = this.paymentSlipProvider.fieldIsValid(
        payment_slip.substr(10, 11)
      );

      const fieldThreeIsValid = this.paymentSlipProvider.fieldIsValid(
        payment_slip.substr(21, 11)
      );

      if (!fieldOneIsValid || !fieldTwoIsValid || !fieldThreeIsValid) {
        throw new AppError({
          code: "invalid.line",
          statusCode: 400,
          message: "Linha digitável invalida",
        });
      }
    } else {
      const fieldOneIsValid = this.paymentSlipProvider.fieldIsValid(
        payment_slip.substr(0, 12)
      );

      const fieldTwoIsValid = this.paymentSlipProvider.fieldIsValid(
        payment_slip.substr(12, 24)
      );

      const fieldThreeIsValid = this.paymentSlipProvider.fieldIsValid(
        payment_slip.substr(24, 36)
      );

      const fieldFourIsValid = this.paymentSlipProvider.fieldIsValid(
        payment_slip.substr(36, 48)
      );

      if (
        !fieldOneIsValid ||
        !fieldTwoIsValid ||
        !fieldThreeIsValid ||
        !fieldFourIsValid
      ) {
        throw new AppError({
          code: "invalid.line",
          statusCode: 400,
          message: "Linha digitável invalida",
        });
      }
    }

    const barCode = this.paymentSlipProvider.getBarCode({
      payment_slip,
      payment_slip_type,
    });

    const barCodeIsValid = this.paymentSlipProvider.barCodeIsValid({
      bar_code: barCode,
      payment_slip_type,
    });

    if (!barCodeIsValid) {
      throw new AppError({
        code: "invalid.line",
        statusCode: 400,
        message: "Linha digitável invalida",
      });
    }

    const amount = this.paymentSlipProvider.getAmount({
      payment_slip,
      payment_slip_type,
    });

    const expirationDate = this.paymentSlipProvider.getExpirationDate({
      payment_slip,
      payment_slip_type,
    });

    const formattedAmount = formatMoneyToBRL(
      `${amount.substring(0, amount.length - 2)}.${amount.substring(
        amount.length - 2,
        amount.length
      )}`
    );

    let formattedExpirationDate = null;

    if (expirationDate) {
      formattedExpirationDate = formatDateYYYYMMDD(expirationDate);
    }

    return {
      barCode,
      amount: formattedAmount,
      expirationDate: formattedExpirationDate,
    };
  }
}

export { ValidatePaymentSlipUseCase };
