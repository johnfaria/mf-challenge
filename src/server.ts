import config from 'config'
import express, { Application } from 'express'
import { Server } from 'http'
import { connectDB } from './database'
import contactsRoute from './routes/contacts.route'
import authRoute from './routes/auth.route'

export class SetupServer {
  private server?: Server

  constructor(private port = config.get('App.PORT'), private app = express()) {}

  public get App(): Application {
    return this.app
  }

  public startServer(): void {
    this.server = this.app.listen(this.port)
  }

  public closeServer(): void {
    if (this.server) {
      this.server.close()
    }
  }

  private async startDatabase(): Promise<void> {
    await connectDB()
  }

  public async SetupExpress(): Promise<void> {
    this.middlewares()
    this.controllers()
    await this.startDatabase()
  }

  private middlewares(): void {
    this.app.use(express.json())
  }

  private controllers(): void {
    this.app.use('/api/', contactsRoute)
    this.app.use('/auth/', authRoute)
  }
}
