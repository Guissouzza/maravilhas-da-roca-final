import { z } from 'zod'

// ===============================
// CREATE USER
// ===============================
export const createUserSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  idade: z.number().int().positive('Idade deve ser um número positivo'),
  email: z.email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})

// ===============================
// UPDATE USER
// ===============================
export const updateUserSchema = z.object({
  nome: z.string().min(1).optional(),
  idade: z.number().int().positive().optional(),
  email: z.email().optional(),
  senha: z.string().min(6).optional()
})

// ===============================
// LOGIN USER
// ===============================
export const loginUserSchema = z.object({
  email: z.email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres')
})