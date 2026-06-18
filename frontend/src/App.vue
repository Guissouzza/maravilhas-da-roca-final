<script setup lang="ts">
import { useRoute } from 'vue-router'
import Header from './components/cabecalho.vue'

const route = useRoute()
</script>

<template>
  <Header v-if="!route.meta.hideHeader" />

  <router-view />
</template>