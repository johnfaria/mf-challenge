import config from 'config'
import express, { Application } from 'express'
import { Server } from 'http'
import { connectDB } from './database'
import contactsRoute from './routes/contacts.route'
import authRoute from './routes/auth.route'
import { Connection } from 'typeorm'

export class SetupServer {
  private server?: Server
  private mysqldatabase?: Connection
  private pgdatabase?: Connection

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
    const db = await connectDB()
    this.pgdatabase = db.pg
    this.mysqldatabase = db.mysql
  }

  public async closeDatabase(): Promise<void> {
    await this.pgdatabase?.close()
    await this.mysqldatabase?.close()
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
