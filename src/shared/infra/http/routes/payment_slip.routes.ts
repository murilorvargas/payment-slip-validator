import { Router } from "express";

import { ValidatePaymentSlipController } from "../../../../modules/paymentSlip/useCases/ValidatePaymentSlipController";
import { validatePaymentSlip } from "../../middlewares/validatePaymentSlip";

const paymentSlipRoutes = Router();

const validatePaymentSlipController = new ValidatePaymentSlipController();

paymentSlipRoutes.get(
  "/:payment_slip",
  validatePaymentSlip,
  validatePaymentSlipController.handle
);

export { paymentSlipRoutes };
