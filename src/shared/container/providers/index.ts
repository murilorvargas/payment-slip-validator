import { container } from "tsyringe";

import { PaymentSlipProvider } from "./PaymentSlipProvider/implementations/PaymentSlipProvider";
import { IPaymentSlipProvider } from "./PaymentSlipProvider/IPaymentSlipProvider";

container.registerSingleton<IPaymentSlipProvider>(
  "PaymentSlipProvider",
  PaymentSlipProvider
);
