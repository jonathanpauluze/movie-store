<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import AppTooltip from './AppTooltip.vue'
import { PhTrash } from '@phosphor-icons/vue'

type PropsType = { open: boolean }
const props = defineProps<PropsType>()

type EmitType = (event: 'close') => void
const emit = defineEmits<EmitType>()

const store = useStore()
const items = computed(() => store.state.cart.items)
const total = computed(() => store.getters['cart/cartTotal'])
const sidebarRef = ref<HTMLElement>()

function close() {
  emit('close')
}

function remove(id: number) {
  store.commit('cart/removeFromCart', id)
}

function clearCart() {
  store.commit('cart/clearCart')
}

function getPoster(path: string) {
  return `https://image.tmdb.org/t/p/w200${path}`
}

function handleClickOutside(event: MouseEvent) {
  if (props.open && sidebarRef.value && !sidebarRef.value.contains(event.target as Node)) {
    close()
  }
}

function handleEsc(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

onMounted(() => {
  window.addEventListener('mousedown', handleClickOutside)
  window.addEventListener('keydown', handleEsc)
})

onUnmounted(() => {
  window.removeEventListener('mousedown', handleClickOutside)
  window.removeEventListener('keydown', handleEsc)
})
</script>

<template>
  <aside class="sidebar" :class="{ open: props.open }" ref="sidebarRef">
    <div class="sidebar-header">
      <h2>Meu Carrinho</h2>
      <button class="clear-btn" @click="clearCart">Esvaziar</button>
    </div>

    <div class="sidebar-content">
      <div v-if="items.length === 0" class="empty">Carrinho vazio</div>

      <ul v-else>
        <li v-for="item in items" :key="item.id" class="cart-item">
          <img :src="getPoster(item.poster_path)" alt="" />

          <div class="info">
            <p class="title">{{ item.title }}</p>

            <p class="price">R$ 9,99</p>

            <AppTooltip text="Remover do carrinho" position="bottom">
              <button aria-label="Remover do carrinho" class="remove-btn" @click="remove(item.id)">
                <PhTrash size="20" weight="fill" title="Remover do carrinho" />
              </button>
            </AppTooltip>
          </div>
        </li>
      </ul>
    </div>

    <div class="sidebar-footer" v-if="items.length > 0">
      <div class="total">Total: R$ {{ total.toFixed(2) }}</div>
      <RouterLink to="/checkout" class="checkout-btn" @click="close"> Finalizar compra </RouterLink>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 350px;
  height: 100vh;
  background: var(--color-background-soft);
  box-shadow: -2px 0 5px var(--color-shadow);
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 1000;
}

.sidebar.open {
  right: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-weight: bold;
  border-bottom: 1px solid var(--color-border);
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.cart-item {
  display: flex;
  margin-bottom: 1rem;
}

.cart-item img {
  width: 60px;
  height: auto;
  margin-right: 0.75rem;
}

.info {
  flex: 1;
}

.title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.price {
  color: var(--color-text);
}

.remove-btn {
  background: transparent;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-text);
  }
}

.sidebar-footer {
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.checkout-btn {
  display: block;
  margin-top: 1rem;
  background: var(--color-primary);
  color: white;
  text-align: center;
  padding: 0.75rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s ease;

  &:hover {
    background: var(--color-primary-hover);
  }
}

.empty {
  text-align: center;
  color: var(--color-text-light);
}
</style>
