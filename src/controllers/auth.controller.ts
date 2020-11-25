import { User } from '../entity/pg/User'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import config, { IConfig } from 'config'
import jwt from 'jsonwebtoken'
const jwt_config: IConfig = config.get('App.auth')
import _ from 'lodash'

export async function signUp(req: Request, res: Response): Promise<void> {
  const result = await getConnection('postgresql-connection')
    .getRepository(User)
    .save(req.user)

  const token: string = jwt.sign(
    { id: result.id, email: result.email },
    jwt_config.get('key'),
    { expiresIn: jwt_config.get('expires_in_seconds') }
  )

  res
    .header('Authorization', token)
    .json(_.omit(result, ['password', 'id', 'updatedAt']))
}

export async function signIn(req: Request, res: Response): Promise<void> {
  const { email, password } = req.user

  const user = await getConnection('postgresql-connection')
    .getRepository(User)
    .createQueryBuilder('user')
    .addSelect('user.password')
    .where('user.email = :email', { email: email })
    .getOne()

  if (!user) {
    res.status(400).json({ code: 400, message: 'Email is wrong' })
    return
  }

  const passwordIsValid = await user?.validatePassword(password)

  if (!passwordIsValid) {
    res.status(400).json({ code: 400, message: 'Invalid password' })
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
}
