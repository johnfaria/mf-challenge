import { User } from '../entity/pg/User'
import { NextFunction, Request, Response } from 'express'
import { getConnection } from 'typeorm'
import config, { IConfig } from 'config'
import jwt from 'jsonwebtoken'
const jwt_config: IConfig = config.get('App.auth')
import createError from 'http-errors'
import _ from 'lodash'

export async function signUp(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await getConnection('postgresql-connection')
      .getRepository(User)
      .save(req.user)

    const token: string = jwt.sign(
      { id: result.id, email: result.email },
      jwt_config.get('key'),
      { expiresIn: jwt_config.get('expires_in_seconds') }
    )

    res
      .status(201)
      .header('Authorization', token)
      .json(_.omit(result, ['password', 'id', 'updatedAt']))
  } catch (error) {
    next(new createError.InternalServerError(error.message))
  }
}

export async function signIn(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.user

    const user = await getConnection('postgresql-connection')
      .getRepository(User)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :email', { email: email })
      .getOne()

    if (!user) {
      next(createError(400, 'Email is wrong'))
      return
    }

    const passwordIsValid = await user?.validatePassword(password)

    if (!passwordIsValid) {
      next(createError(400, 'Invalid password'))
      return
    }

    const token = jwt.sign(
      { id: user?.id, email: user?.email },
      jwt_config.get('key'),
      { expiresIn: jwt_config.get('expires_in_seconds') }
    )

    res
      .header('Authorization', token)
      .json(_.omit(user, ['id', 'password', 'updatedAt']))
  } catch (error) {
    next(new createError.InternalServerError(error.message))
  }
}
