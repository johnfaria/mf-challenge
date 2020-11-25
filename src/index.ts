import 'reflect-metadata'
import { SetupServer } from './server'

;(async (): Promise<void> => {
  const server = new SetupServer()
  await server.SetupExpress()
  server.startServer()
})()
