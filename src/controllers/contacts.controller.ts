import { ContactsMacapa } from '../entity/mysql/ContactsMacapa'
import { ContactsVarejao } from '../entity/pg/ContactsVarejao'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import { formatPhone } from '../utils/phoneformat.util'
import { IContact } from '../interfaces/IContact'

export const postMacapa = async (
  req: Request,
  res: Response
): Promise<void> => {
  const phoneList = req.body.contacts.map(formatPhone)

  const databaseReturn = await getConnection('mysql-connection')
    .createQueryBuilder()
    .insert()
    .into(ContactsMacapa)
    .values(phoneList)
    .execute()

  res.send(databaseReturn)
}

export const postVarejao = async (
  req: Request,
  res: Response
): Promise<void> => {
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
}

export const getMacapa = async (req: Request, res: Response): Promise<void> => {
  const result = await getConnection('mysql-connection')
    .getRepository(ContactsMacapa)
    .find()

  res.send(result)
}

export const getVarejao = async (
  req: Request,
  res: Response
): Promise<void> => {
  const result = await getConnection('postgresql-connection')
    .getRepository(ContactsVarejao)
    .find()

  res.send(result)
}
