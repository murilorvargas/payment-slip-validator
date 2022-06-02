import { IBarCodeIsValidDTO } from "../dtos/IBarCodeIsValidDTO";
import { IGetAmountDTO } from "../dtos/IGetAmountDTO";
import { IGetBarCodeDTO } from "../dtos/IGetBarCodeDTO";
import { IGetExpirationDateDTO } from "../dtos/IGetExpirationDateDTO";
import { IPaymentSlipProvider } from "../IPaymentSlipProvider";

class PaymentSlipProvider implements IPaymentSlipProvider {
  fieldIsValid(field: string): boolean {
    const verifyingDigit = Number(field.substr(-1));
    const fieldCharactersArray = field.split("");

    fieldCharactersArray.pop();
    fieldCharactersArray.reverse();

    const arrayOfFieldMultiplicationByMultipliers: number[] = [];

    fieldCharactersArray.forEach((character, index) => {
      let multiplier: number;

      if (index % 2 === 0) {
        multiplier = 2;
      } else multiplier = 1;

      arrayOfFieldMultiplicationByMultipliers.push(
        Number(character) * multiplier
      );
    });

    const sumOfFieldMultiplication =
      arrayOfFieldMultiplicationByMultipliers.reduce(
        (characterSum, currentCharacter) => {
          if (currentCharacter === 0) return characterSum;
          return (currentCharacter % 9 || 9) + characterSum;
        },
        0
      );

    let calculatedVerifyingDigit =
      Math.ceil(sumOfFieldMultiplication / 10) * 10 - sumOfFieldMultiplication;

    if (calculatedVerifyingDigit === 10) calculatedVerifyingDigit = 0;

    return calculatedVerifyingDigit === verifyingDigit;
  }

  getBarCode({ payment_slip, payment_slip_type }: IGetBarCodeDTO): string {
    const paymentSlipCharactersArray = payment_slip.split("");

    if (payment_slip_type === "bank") {
      const barCode = ""
        .concat(paymentSlipCharactersArray.slice(0, 3).join(""))
        .concat(paymentSlipCharactersArray[3])
        .concat(paymentSlipCharactersArray[32])
        .concat(paymentSlipCharactersArray.slice(33, 37).join(""))
        .concat(paymentSlipCharactersArray.slice(37, 47).join(""))
        .concat(paymentSlipCharactersArray.slice(4, 9).join(""))
        .concat(paymentSlipCharactersArray.slice(10, 20).join(""))
        .concat(paymentSlipCharactersArray.slice(21, 31).join(""));

      return barCode;
    }

    const barCode = ""
      .concat(paymentSlipCharactersArray.slice(0, 11).join(""))
      .concat(paymentSlipCharactersArray.slice(12, 23).join(""))
      .concat(paymentSlipCharactersArray.slice(24, 35).join(""))
      .concat(paymentSlipCharactersArray.slice(36, 47).join(""));

    return barCode;
  }

  barCodeIsValid({ bar_code, payment_slip_type }: IBarCodeIsValidDTO): boolean {
    if (payment_slip_type === "bank") {
      const verifyingDigit = Number(bar_code.substr(4, 1));
      const barCodeCharactersArray = bar_code.split("");

      barCodeCharactersArray.splice(4, 1);
      barCodeCharactersArray.reverse();

      let multiplier = 1;

      const sumOfBarCodeMultiplication = barCodeCharactersArray.reduce(
        (characterSum, currentCharacter) => {
          if (multiplier > 8) {
            multiplier = 2;
          } else multiplier++;

          return characterSum + Number(currentCharacter) * multiplier;
        },
        0
      );

      let calculatedVerifyingDigit = 11 - (sumOfBarCodeMultiplication % 11);

      if (
        calculatedVerifyingDigit === 0 ||
        calculatedVerifyingDigit === 10 ||
        calculatedVerifyingDigit === 11
      ) {
        calculatedVerifyingDigit = 1;
      }

      return calculatedVerifyingDigit === verifyingDigit;
    }
    const verifyingDigit = Number(bar_code.substr(3, 1));

    const barCodeFieldOne = bar_code.substr(0, 3);
    const barCodeFieldTwo = bar_code.substr(4, 44);
    const barCodeFieldOneArray = barCodeFieldOne.split("");
    const barCodeFieldTwoArray = barCodeFieldTwo.split("");
    barCodeFieldOneArray.reverse();
    barCodeFieldTwoArray.reverse();

    const barCodeFieldOneArrayMultiplicationArray: number[] = [];
    const barCodeFieldTwoArrayMultiplicationArray: number[] = [];

    barCodeFieldOneArray.forEach((character, index) => {
      let multiplier: number;

      if (index % 2 === 0) {
        multiplier = 2;
      } else multiplier = 1;

      barCodeFieldOneArrayMultiplicationArray.push(
        Number(character) * multiplier
      );
    });

    barCodeFieldTwoArray.forEach((character, index) => {
      let multiplier: number;

      if (index % 2 === 0) {
        multiplier = 2;
      } else multiplier = 1;

      barCodeFieldTwoArrayMultiplicationArray.push(
        Number(character) * multiplier
      );
    });

    const sumOfFieldOneMultiplication =
      barCodeFieldOneArrayMultiplicationArray.reduce(
        (characterSum, currentCharacter) => {
          if (currentCharacter === 0) return characterSum;
          return (currentCharacter % 9 || 9) + characterSum;
        },
        0
      );

    const sumOfFieldTwoMultiplication =
      barCodeFieldTwoArrayMultiplicationArray.reduce(
        (characterSum, currentCharacter) => {
          if (currentCharacter === 0) return characterSum;
          return (currentCharacter % 9 || 9) + characterSum;
        },
        0
      );

    const calculatedVerifyingDigit =
      10 - ((sumOfFieldOneMultiplication + sumOfFieldTwoMultiplication) % 10);

    return verifyingDigit === calculatedVerifyingDigit;
  }

  getAmount({ payment_slip, payment_slip_type }: IGetAmountDTO): string {
    if (payment_slip_type === "bank") {
      const amount = payment_slip.substr(37, 10);
      return amount;
    }
    const amount = payment_slip.substr(4, 7) + payment_slip.substr(12, 4);
    return amount;
  }

  getExpirationDate({
    payment_slip,
    payment_slip_type,
  }: IGetExpirationDateDTO): Date | null {
    if (payment_slip_type === "bank") {
      const expirationFactor = payment_slip.substr(33, 4);
      const expirationDate = new Date(2000, 6, 3);
      const daysToSum = Number(expirationFactor) - 1000;
      expirationDate.setDate(expirationDate.getDate() + daysToSum);

      return expirationDate;
    }

    return null;
  }
}

export { PaymentSlipProvider };
