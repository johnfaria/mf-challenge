import { SetupServer } from '@src/server'
import supertest from 'supertest'

let server: SetupServer

beforeAll(async () => {
  server = new SetupServer()
  await server.SetupExpress()
  global.testRequest = supertest(server.App)
})

afterAll(async () => {
  await server.closeDatabase()
})
