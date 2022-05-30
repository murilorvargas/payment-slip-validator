import express, { Request, Response } from "express";

import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(8080, () => console.log("Server is running!"));
