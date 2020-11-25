import { ContactsAmapa } from '../entity/mysql/ContactsAmapa'
import { ContactsVarejao } from '../entity/pg/ContactsVarejao'
import { Request, Response } from 'express'
import { getConnection } from 'typeorm'

export const getAmapa = async (req: Request, res: Response): Promise<void> => {
  const result = await getConnection('mysql-connection')
    .getRepository(ContactsAmapa)
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
