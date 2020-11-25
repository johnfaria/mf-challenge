import express, { Request, Response } from 'express'
import { getConnection } from 'typeorm'
import { ContactsAmapa } from './entity/mysql/ContactsAmapa'
import { ContactsVarejao } from './entity/pg/ContacsVarejao'

import './database'

const app = express()

app.get('/amapa', async (req: Request, res: Response) => {
  const result = await getConnection('mysql-connection')
    .getRepository(ContactsAmapa)
    .find()
  res.send(result)
})

app.get('/varejao', async (req: Request, res: Response) => {
  const result = await getConnection('postgresql-connection')
    .getRepository(ContactsVarejao)
    .find()
  res.send(result)
})

app.listen(3000, () => {
  console.log('Listening on port 3000')
})
