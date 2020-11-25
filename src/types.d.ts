import * as http from 'http'
import { User } from './entity/pg/User';

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    decoded,
    user: User
  }
}
