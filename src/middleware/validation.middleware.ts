import { User } from '../entity/pg/User'
import { Request, Response, NextFunction, RequestHandler } from 'express'
import { validate } from 'class-validator'

export const validateUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = new User()
    Object.assign(user, req.body)
    const errors = await validate(user)
    if (errors.length > 0) {
      res
        .status(422)
        .send({ status: 422, message: errors.map((el) => el.constraints) })
      return
    } else {
      req.user = user
      next()
    }
  } catch (error) {
    next(error)
  }
}
