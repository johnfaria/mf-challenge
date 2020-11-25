import { createConnection } from 'typeorm'

async function connectDB(): Promise<void> {
  await createConnection('postgresql-connection')
  console.log('Connected to database postgres')

  await createConnection('mysql-connection')
  console.log('Connected to database mysql')
}

connectDB()
