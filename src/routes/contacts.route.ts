import { getAmapa, getVarejao } from '../controllers/contacts.controller'
import { Router } from 'express'
import { tokenValidation } from '../middleware/auth.middleware'
const router = Router()

router.get('/amapa', tokenValidation, getAmapa)
router.get('/varejao', tokenValidation, getVarejao)

export default router
