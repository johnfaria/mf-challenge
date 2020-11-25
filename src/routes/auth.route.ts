import { signIn, signUp } from '../controllers/auth.controller'
import { Router } from 'express'
import { validateUser } from '../middleware/validation.middleware'
const router = Router()

router.post('/signin', validateUser, signIn)
router.post('/signup', validateUser, signUp)

export default router
