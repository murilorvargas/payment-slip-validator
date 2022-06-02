import { IBarCodeIsValidDTO } from "./dtos/IBarCodeIsValidDTO";
import { IGetAmountDTO } from "./dtos/IGetAmountDTO";
import { IGetBarCodeDTO } from "./dtos/IGetBarCodeDTO";
import { IGetExpirationDateDTO } from "./dtos/IGetExpirationDateDTO";

interface IPaymentSlipProvider {
  fieldIsValid(field: string): boolean;
  getBarCode({ payment_slip, payment_slip_type }: IGetBarCodeDTO): string;
  barCodeIsValid({ bar_code, payment_slip_type }: IBarCodeIsValidDTO): boolean;
  getAmount({ payment_slip, payment_slip_type }: IGetAmountDTO): string;
  getExpirationDate({
    payment_slip,
    payment_slip_type,
  }: IGetExpirationDateDTO): Date | null;
}

export { IPaymentSlipProvider };
