import { Connection, createConnection } from 'typeorm'

export async function connectDB(): Promise<{
  pg: Connection
  mysql: Connection
}> {
  const pg = await createConnection('postgresql-connection')
  console.log('Connected to database postgres')

  const mysql = await createConnection('mysql-connection')
  console.log('Connected to database mysql')
  return { pg, mysql }
}
