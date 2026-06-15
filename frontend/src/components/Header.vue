<template>
  <header class="bg-roca-bg py-5 border-b border-[#EADFCB]">
    <div class="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
      
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-full border-2 border-[#EADFCB] shadow-sm overflow-hidden flex-shrink-0 bg-white">
          <img src="../assets/logo.jpeg" alt="Logo Maravilhas da Roça" class="w-full h-full object-cover" />
        </div>
        
        <div class="flex flex-col">
          <h1 class="text-2xl font-serif font-bold text-roca-dark leading-tight">Maravilhas da Roça</h1>
          <span class="text-[10px] text-roca-medium font-bold tracking-[0.2em] uppercase">Sabor Ancestral</span>
        </div>
      </div>

      <div class="relative w-full max-w-md hidden md:block">
        <input 
          type="search" 
          placeholder="Buscar queijo, mel, doce..." 
          class="w-full bg-white border border-[#D7C8BB] rounded-full py-2.5 px-10 text-sm text-roca-dark placeholder-[#D7C8BB] focus:outline-none focus:ring-1 focus:ring-roca-medium transition-all"
        />
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#D7C8BB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <nav class="flex items-center gap-8 text-roca-dark font-medium text-sm">
        <router-link to="/" class="hover:text-roca-medium transition-colors" active-class="border-b-2 border-roca-dark pb-1 font-bold">Início</router-link>
        <router-link to="/catalogo" class="hover:text-roca-medium transition-colors" active-class="border-b-2 border-roca-dark pb-1 font-bold">Catálogo</router-link>
        <router-link to="/favoritos" class="hover:text-roca-medium transition-colors" active-class="border-b-2 border-roca-dark pb-1 font-bold">Favoritos</router-link>
        <router-link to="/sobre" class="hover:text-roca-medium transition-colors" active-class="border-b-2 border-roca-dark pb-1 font-bold">Sobre Nós</router-link>
      </nav>

    </div>
  </header>
</template>