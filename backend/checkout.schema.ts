import { z } from 'zod';


export const CheckoutSchema = z.object({

  usuarioId: z.number().int().positive({ message: "Usuário inválido" }),
  

  itens: z.array(
    z.object({
      produtoId: z.number().int().positive(),

      quantidade: z.number().int().min(1, "A quantidade mínima é 1").max(99)
    })
  ).min(1, "O carrinho não pode estar vazio")
});


export type CheckoutInput = z.infer<typeof CheckoutSchema>;

