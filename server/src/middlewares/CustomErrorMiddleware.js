import { CustomError } from "../helpers/CustomError.js";

export function customErrorMiddleware(req, res, next) {
  res.error = CustomError;
  next();
}