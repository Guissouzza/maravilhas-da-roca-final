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
    },

    {
      path: '/catalogo',
      name: 'catalogo',
      component: CatalogoProduto,
    },

    {
      path: '/cadastro-produtos',
      name: 'cadastro-produtos',
      component: CadastroProdutos,
    },

    {
      path: '/carrinho',
      name: 'carrinho',
      component: CartItem,
    },

    {
      path: '/produto/:id',
      name: 'descricao-produto',
      component: DescricaoProduto,
      props: true,
    },

    {
      path: '/favoritos',
      name: 'favoritos',
      component: Favoritos,
    },

    {
      path: '/reserva',
      name: 'reserva',
      component: ReservaProduto,
    },

    {
      path: '/sobre',
      name: 'sobre',
      component: SobreNos,
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
    },

    {
      path: '/cadastro',
      name: 'cadastro',
      component: Cadastro,
    },
  ],
})

// 🔐 BLOQUEIO GLOBAL (TODAS AS ROTAS EXCETO LOGIN/CADASTRO)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')

  const publicPages = ['/login', '/cadastro']
  const isPublic = publicPages.includes(to.path)

  if (!isPublic && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router