import { Router } from 'express'
import authMiddleware from '../middlewares/authMiddleware'

const router = Router()

// 🔐 valida token e retorna usuário logado
router.get('/me', authMiddleware, (req, res) => {
  return res.json({
    user: req.user
  })
})

export default router