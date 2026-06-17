import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import CatalogoProduto from '../views/CatalogoProduto.vue'
import CadastroProdutos from '../views/CadastroProdutos.vue'
import CartItem from '../views/CartItem.vue'
import DescricaoProduto from '../views/DescricaoProduto.vue'
import Favoritos from '../views/Favoritos.vue'
import ReservaProduto from '../views/ReservaProduto.vue'
import SobreNos from '../views/SobreNos.vue'
import Login from '../views/Login.vue'
import Cadastro from '../views/CadastroUsuario.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true }
    },

    {
      path: '/catalogo',
      name: 'catalogo',
      component: CatalogoProduto,
      meta: { requiresAuth: true }
    },

    {
      path: '/cadastro-produtos',
      name: 'cadastro-produtos',
      component: CadastroProdutos,
      meta: { requiresAuth: true }
    },

    {
      path: '/carrinho',
      name: 'carrinho',
      component: CartItem,
      meta: { requiresAuth: true }
    },

    {
      path: '/produto/:id',
      name: 'descricao-produto',
      component: DescricaoProduto,
      props: true,
      meta: { requiresAuth: true }
    },

    {
      path: '/favoritos',
      name: 'favoritos',
      component: Favoritos,
      meta: { requiresAuth: true }
    },

    {
      path: '/reserva',
      name: 'reserva',
      component: ReservaProduto,
      meta: { requiresAuth: true }
    },

    {
      path: '/sobre',
      name: 'sobre',
      component: SobreNos,
      meta: { requiresAuth: true }
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro
    },
  ],
})

/**
 * 🔐 PROTEÇÃO GLOBAL DE ROTAS
 */
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    return next({ name: 'login' })
  }

  next()
})

export default router