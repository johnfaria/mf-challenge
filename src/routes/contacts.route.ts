import {
  getMacapa,
  getVarejao,
  postMacapa,
  postVarejao,
} from '../controllers/contacts.controller'
import { Router } from 'express'
import { tokenValidation } from '../middleware/auth.middleware'
const router = Router()

router.post('/macapa', tokenValidation, postMacapa)
router.post('/varejao', tokenValidation, postVarejao)
router.get('/macapa', tokenValidation, getMacapa)
router.get('/varejao', tokenValidation, getVarejao)

export default router
