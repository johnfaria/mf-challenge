import {
  getMacapa,
  getVarejao,
  postMacapa,
  postVarejao,
} from '../controllers/contacts.controller'
import { Router } from 'express'
import { tokenValidation } from '../middleware/auth.middleware'
const router = Router()

router.post('/amapa', tokenValidation, postMacapa)
router.post('/varejao', tokenValidation, postVarejao)
router.get('/amapa', tokenValidation, getMacapa)
router.get('/varejao', tokenValidation, getVarejao)

export default router
