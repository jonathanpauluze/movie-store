<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import AppTooltip from './AppTooltip.vue'
import AppButton from './AppButton.vue'
import { PhTrash } from '@phosphor-icons/vue'

type PropsType = { open: boolean }
const props = defineProps<PropsType>()

type EmitType = (event: 'close') => void
const emit = defineEmits<EmitType>()

const store = useStore()
const items = computed(() => store.state.cart.items)
const total = computed(() => store.getters['cart/cartTotal'])
const cartCount = computed(() => store.getters['cart/cartCount'])
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
      <AppButton v-if="cartCount > 0" variant="link" @click="clearCart">Esvaziar</AppButton>
    </div>

    <div class="sidebar-content">
      <div v-if="items.length === 0" class="empty">Carrinho vazio</div>

      <ul class="cart-item-list" v-else>
        <li v-for="item in items" :key="item.id" class="cart-item">
          <img :src="getPoster(item.poster_path)" alt="" />

          <p class="title" :title="item.title">{{ item.title }}</p>

          <p>1</p>

          <p class="price">R$ 9,99</p>

          <AppTooltip text="Remover do carrinho" position="left">
            <button aria-label="Remover do carrinho" class="remove-btn" @click="remove(item.id)">
              <PhTrash size="20" weight="fill" title="Remover do carrinho" />
            </button>
          </AppTooltip>
        </li>
      </ul>
    </div>

    <div class="sidebar-footer" v-if="items.length > 0">
      <div class="total">
        Total: <strong>R$ {{ total.toFixed(2) }}</strong>
      </div>

      <RouterLink to="/checkout" class="checkout-link">
        <AppButton fullWidth size="lg" @click="close">Finalizar compra</AppButton>
      </RouterLink>
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
  padding: 1rem;
}

.cart-item-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.cart-item img {
  width: 40px;
  height: 40px;
  background-color: #ccc;
}

.title {
  flex: 1;
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  max-height: calc(1.2em * 2);
}

.price {
  color: var(--color-text);
  font-weight: bold;
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
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid var(--color-border);
}

.total {
  display: flex;
  justify-content: space-between;
  gap: 1rem;

  strong {
    font-size: 1.25rem;
    font-weight: bold;
  }
}

.checkout-link {
  text-decoration: none;
}

.empty {
  text-align: center;
  color: var(--color-text-light);
}
</style>
