import { SetupServer } from '@src/server'
import supertest from 'supertest'
import { getConnection } from 'typeorm'

let server: SetupServer

beforeAll(async () => {
  server = new SetupServer()
  await server.SetupExpress()
  global.testRequest = supertest(server.App)
})

afterAll(async () => {
  await server.closeDatabase()
})

afterEach(async () => {
  // Fetch all the entities
  const entities_pg = getConnection('postgresql-connection').entityMetadatas
  const entities_mysql = getConnection('mysql-connection').entityMetadatas

  for (const entity of entities_pg) {
    const repository = getConnection('postgresql-connection').getRepository(
      entity.name
    )
    await repository.clear() // Clear each entity table's content
  }

  for (const entity of entities_mysql) {
    const repository = getConnection('mysql-connection').getRepository(
      entity.name
    )
    await repository.clear() // Clear each entity table's content
  }
})
