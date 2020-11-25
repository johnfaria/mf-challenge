import { Connection, createConnection } from 'typeorm'
import logger from './utils/logger'

export async function connectDB(): Promise<{
  pg: Connection
  mysql: Connection
}> {
  const pg = await createConnection('postgresql-connection')
  logger.info('Connected to database postgres')

  const mysql = await createConnection('mysql-connection')
  logger.info('Connected to database mysql')
  return { pg, mysql }
}
