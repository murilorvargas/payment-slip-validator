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

    const calculatedVerifyingDigit =
      Math.ceil(sumOfFieldMultiplication / 10) * 10 - sumOfFieldMultiplication;

    return calculatedVerifyingDigit === verifyingDigit;
  }

  getExpirationDate(expirationFactor: string): Date {
    const expirationDate = new Date(2000, 6, 3);
    const daysToSum = Number(expirationFactor) - 1000;
    expirationDate.setDate(expirationDate.getDate() + daysToSum);

    return expirationDate;
  }
}

export { PaymentSlipProvider };
