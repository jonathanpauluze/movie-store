<script setup lang="ts">
import AppSidebar from './AppSidebar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import AppTooltip from './AppTooltip.vue'
import AppButton from './AppButton.vue'
import { PhTrash } from '@phosphor-icons/vue'
import { getPrice } from '@/utils/getPrice'
import { formatCurrency } from '@/utils/formatCurrency'

type PropsType = { open: boolean }

defineProps<PropsType>()

type EmitType = (event: 'close') => void

const emit = defineEmits<EmitType>()

const store = useStore()
const items = computed(() => store.state.cart.items)
const total = computed(() => store.getters['cart/cartTotal'])
const cartCount = computed(() => store.getters['cart/cartCount'])

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
</script>

<template>
  <AppSidebar :open="open" @close="$emit('close')">
    <div class="sidebar-header">
      <h2>Meu Carrinho</h2>
      <AppButton v-if="cartCount > 0" variant="link" @click="clearCart" class="clear-btn"
        >Esvaziar</AppButton
      >
    </div>

    <div class="sidebar-content">
      <div v-if="items.length === 0" class="empty">Carrinho vazio</div>

      <ul class="cart-item-list" v-else>
        <li v-for="item in items" :key="item.id" class="cart-item">
          <img :src="getPoster(item.poster_path)" alt="" />

          <p class="title" :title="item.title">{{ item.title }}</p>

          <p>1</p>

          <p class="price">{{ formatCurrency(getPrice(item.id)) }}</p>

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
        Total: <strong>{{ formatCurrency(total) }}</strong>
      </div>

      <RouterLink to="/checkout" class="checkout-link">
        <AppButton fullWidth size="lg" @click="close">Finalizar compra</AppButton>
      </RouterLink>
    </div>
  </AppSidebar>
</template>

<style scoped scss>
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

  img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
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
  flex: 0.5;
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
