<script setup lang="ts">
import { ref } from 'vue'
import Cabecalho from '../components/cabecalho.vue'
import Footer from '../components/footer.vue'

const categorias = [
  'Remédios Naturais',
  'Iguarias',
  'Bebidas',
  'Temperos',
]

const produtos = [
  {
    nome: 'Queijo Artesanal Curado',
    preco: 'R$ 29,90',
    imagem: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b'
  },
  {
    nome: 'Doce de Leite da Fazenda',
    preco: 'R$ 18,90',
    imagem: 'https://images.unsplash.com/photo-1551024601-bec78aea704b'
  },
  {
    nome: 'Cachaça Premium Envelhecida',
    preco: 'R$ 49,90',
    imagem: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b'
  },
]
</script>

<template>
<div class="min-h-screen bg-[#F7F1E8] text-[#2E1F16] antialiased">

  <Cabecalho />

  <!-- HERO CINEMATOGRÁFICO -->
  <section class="relative h-[92vh] flex items-center overflow-hidden">

    <img
    src="https://images.unsplash.com/photo-1606787366850-de6330128bfc"
    class="absolute inset-0 w-full h-full object-cover scale-110"
    />

    <!-- CAMADA PREMIUM -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#1A120D]/95 via-[#2A1B12]/70 to-transparent"></div>

    <!-- glow sutil -->
    <div class="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_40%,#C49A55_0%,transparent_60%)]"></div>

    <div class="relative max-w-7xl mx-auto px-8">

      <div class="max-w-4xl">

        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs tracking-[0.3em] uppercase">
          🌾 tradição & sabor artesanal
        </div>

        <h1 class="mt-10 text-6xl sm:text-8xl font-black text-white leading-[1.05] font-serif">
          O verdadeiro sabor<br />
          <span class="text-[#E7CFA7]">da roça viva</span>
        </h1>

        <p class="mt-10 text-lg sm:text-xl text-white/80 max-w-2xl leading-relaxed">
          Produtos artesanais criados por pequenos produtores, com identidade, memória e sabor real — sem industrialização.
        </p>

        <div class="mt-12 flex gap-5 flex-wrap">

          <RouterLink
            to="/catalogo"
            class="bg-[#C49A55] hover:bg-[#b68a3d] text-white px-10 py-4 rounded-full font-bold tracking-wide transition-all hover:scale-105 shadow-xl"
          >
            Explorar Catálogo
          </RouterLink>

          <button class="text-white border border-white/30 px-10 py-4 rounded-full hover:bg-white/10 backdrop-blur-md transition">
            Nossa História
          </button>

        </div>

      </div>

    </div>
  </section>

  <!-- CATEGORIAS ULTRA CLEAN -->
  <section class="py-28">

    <div class="max-w-7xl mx-auto px-8">

      <h2 class="text-center text-5xl sm:text-6xl font-black font-serif mb-20">
        Categorias
      </h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

        <div
          v-for="item in categorias"
          :key="item"
          class="group relative bg-white/70 backdrop-blur-xl border border-[#EED9C4]/40 rounded-[2.5rem] p-10 text-center shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3"
        >

          <div class="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#C49A55]/10 to-transparent"></div>

          <div class="relative text-5xl mb-6 group-hover:scale-110 transition">
            🌾
          </div>

          <h3 class="relative font-black text-xl group-hover:text-[#C49A55] transition">
            {{ item }}
          </h3>

        </div>

      </div>

    </div>
  </section>


  <!-- SOBRE CINEMATOGRÁFICO -->
  <section class="py-40">

    <div class="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

      <div class="relative">
        <img
          src="https://images.unsplash.com/photo-1464226184884-fa280b87c399"
          class="rounded-[3rem] shadow-2xl"
        />
        <div class="absolute -inset-6 bg-[#C49A55]/10 blur-2xl rounded-[3rem] -z-10"></div>
      </div>

      <div>

        <span class="text-xs tracking-[0.4em] uppercase text-[#C49A55] font-bold">
          nossa essência
        </span>

        <h2 class="mt-6 text-6xl font-black font-serif leading-tight">
          Da terra,<br />com verdade.
        </h2>

        <p class="mt-10 text-lg leading-9 text-[#5A3B2B]">
          Cada produto carrega história, cultura e trabalho artesanal.
          Aqui não vendemos apenas alimentos — vendemos origem.
        </p>

      </div>

    </div>
  </section>

  <Footer />

</div>
</template>