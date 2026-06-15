<template>
  <div class="min-h-screen bg-roca-bg">
    <Cabecalho />
    
    <main>
      <Favoritos />
    </main>
    <Footer />
  </div>
</template>

<script setup>
// Importa os dois componentes corretamente
import Favoritos from '../components/favoritos.vue'
import Cabecalho from '../components/cabecalho.vue'
import Footer from '../components/footer.vue'
</script>