import { Request, Response } from "express";
import { container } from "tsyringe";

import { ValidatePaymentSlipUseCase } from "./ValidatePaymentSlipUseCase";

class ValidatePaymentSlipController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { payment_slip } = req.params;

    const validatePaymentSlipUseCase = container.resolve(
      ValidatePaymentSlipUseCase
    );

    const response = await validatePaymentSlipUseCase.execute({
      payment_slip,
    });

    return res.status(200).json(response);
  }
}

export { ValidatePaymentSlipController };
