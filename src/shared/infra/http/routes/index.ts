import { Router } from "express";

import { paymentSlipRoutes } from "./payment_slip.routes";

const router = Router();

router.use("/boleto", paymentSlipRoutes);

export { router };
