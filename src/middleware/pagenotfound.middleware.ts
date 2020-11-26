import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'

export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next(new createError.NotFound())
}
