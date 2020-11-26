import { ContactsMacapa } from '../entity/mysql/ContactsMacapa'
import { ContactsVarejao } from '../entity/pg/ContactsVarejao'
import { NextFunction, Request, Response } from 'express'
import { getConnection } from 'typeorm'
import { formatPhone } from '../utils/phoneformat.util'
import { IContact } from '../interfaces/IContact'
import createError from 'http-errors'

export const postMacapa = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const phoneList = req.body.contacts.map(formatPhone)

    const databaseReturn = await getConnection('mysql-connection')
      .createQueryBuilder()
      .insert()
      .into(ContactsMacapa)
      .values(phoneList)
      .execute()

    res.send(databaseReturn)
  } catch (error) {
    next(new createError.InternalServerError(error.message))
  }
}

export const postVarejao = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const phoneList = req.body.contacts.map((el: IContact) => {
      return { nome: el.name, celular: el.cellphone }
    })

    const databaseReturn = await getConnection('postgresql-connection')
      .createQueryBuilder()
      .insert()
      .into(ContactsVarejao)
      .values(phoneList)
      .execute()

    res.send(databaseReturn)
  } catch (error) {
    next(new createError.InternalServerError(error.message))
  }
}

export const getMacapa = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getConnection('mysql-connection')
      .getRepository(ContactsMacapa)
      .find()

    res.send(result)
  } catch (error) {
    next(new createError.InternalServerError(error.message))
  }
}

export const getVarejao = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await getConnection('postgresql-connection')
      .getRepository(ContactsVarejao)
      .find()

    res.send(result)
  } catch (error) {
    next(new createError.InternalServerError(error.message))
  }
}
