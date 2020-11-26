import { Request, Response, NextFunction } from 'express'
import { HttpError } from 'http-errors'

export const errorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: NextFunction
): void => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message,
  })
}
