import { getAmapa, getVarejao } from '../controllers/contacts.controller'
import { Router } from 'express'
const router = Router()

router.get('/amapa', getAmapa)
router.get('/varejao', getVarejao)

export default router
