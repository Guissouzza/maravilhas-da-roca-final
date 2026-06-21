<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useShopStore } from '../stores/shop'; 

const router = useRouter();
const shop = useShopStore();

const logout = () => {
  // 1. Limpa completamente os dados de autenticação do navegador
  localStorage.removeItem('token');
  localStorage.removeItem('user_role');
  
  // 2. Reseta o estado global do carrinho/produtos na store
  shop.clearStore();
  
  // 3. Redireciona o usuário direto para a tela de login 🚀
  router.push('/login');
};
</script>

<template>
  <header class="bg-[#362212] text-[#FAF6EE] shadow-md select-none sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      
      <div class="flex items-center gap-2">
        <span class="text-xl">🌾</span>
        <span class="font-serif font-black tracking-wider text-sm sm:text-base uppercase text-[#EED9C4]">
          Maravilhas da Roça <span class="text-xs bg-[#A0522D] px-2 py-0.5 rounded text-white ml-1">Painel Admin</span>
        </span>
      </div>

      <nav class="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest font-bold">
        <router-link to="/admin/produtos" class="hover:text-[#EED9C4] transition" active-class="text-[#D9B48F] underline">
          Cadastro de Produto
        </router-link>
        <router-link to="/admin/estoque" class="hover:text-[#EED9C4] transition" active-class="text-[#D9B48F] underline">
          Estoque
        </router-link>
        <router-link to="/admin/pedidos" class="hover:text-[#EED9C4] transition" active-class="text-[#D9B48F] underline">
          Pedidos
        </router-link>
      </nav>

      <div class="flex items-center gap-4">
        <button 
          @click="logout" 
          class="text-xs uppercase tracking-wider font-semibold border border-[#EED9C4]/30 px-4 py-1.5 rounded-full hover:bg-white/10 transition"
        >
          Sair 
        </button>
      </div>

    </div>
  </header>
</template>