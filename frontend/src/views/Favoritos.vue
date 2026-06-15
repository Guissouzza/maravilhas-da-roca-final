<template>
  <div class="min-h-screen bg-roca-bg">
    <Header />
    
    <main>
      <Favoritos />
    </main>
  </div>
</template>

<script setup>
// Importa os dois componentes corretamente
import Header from './components/Header.vue'
import Favoritos from './components/favoritos.vue'
</script>