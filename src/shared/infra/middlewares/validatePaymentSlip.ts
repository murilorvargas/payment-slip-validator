import { NextFunction, Request, Response } from "express";

import { stringHasOnlyNumericCharacters } from "../../../utils/stringHasOnlyNumericCharacters";
import { AppError } from "../../errors/AppError";

function validatePaymentSlip(req: Request, res: Response, next: NextFunction) {
  const { payment_slip } = req.params;

  if (payment_slip.length < 47 || payment_slip.length > 48) {
    throw new AppError({
      code: "invalid.line",
      message: "São aceitos apenas boletos com 47 ou 48 dígitos",
      statusCode: 400,
    });
  }

  if (!stringHasOnlyNumericCharacters(payment_slip)) {
    throw new AppError({
      code: "invalid.line",
      message: "São aceitos apenas caracteres numéricos",
      statusCode: 400,
    });
  }

  return next();
}

export { validatePaymentSlip };
