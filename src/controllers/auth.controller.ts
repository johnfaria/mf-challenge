import { Request, Response } from 'express'

export async function signUp(req: Request, res: Response): Promise<void> {
  res.send('sigunup')
}

export async function signIn(req: Request, res: Response): Promise<void> {
  res.send('signin')
}
