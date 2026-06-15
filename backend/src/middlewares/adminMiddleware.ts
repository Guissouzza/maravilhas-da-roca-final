import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()

function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: 'Não autenticado' })
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({
      message: 'Acesso negado: somente admin'
    })
  }

  next()
}

export default adminMiddleware