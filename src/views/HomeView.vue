<script setup lang="ts">
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const cartCount = computed(() => store.getters['cart/cartCount'])

function addFakeMovie() {
  store.commit('cart/addToCart', {
    id: 1,
    title: 'Filme de Teste',
    release_date: '2023-01-01',
    vote_average: 8.5,
    vote_count: 1200,
    poster_path: '',
  })
}
</script>

<template>
  <div>
    <p>Home</p>
    <button @click="addFakeMovie">Adicionar Filme</button>
    <p>Itens no carrinho: {{ cartCount }}</p>
  </div>
</template>
