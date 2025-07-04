<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useStore } from 'vuex'
import InputField from '@/components/form/InputField.vue'
import AppButton from '@/components/AppButton.vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, numeric, minLength, helpers } from '@vuelidate/validators'
import { formatCurrency } from '@/utils/formatCurrency'
import { getPrice } from '@/utils/getPrice'
import { maskCPF, maskPhone } from '@/utils/masks'
import type { Movie } from '@/types/movie'

const store = useStore()
const cartItems = computed<Movie[]>(() => store.state.cart.items)
const total = computed(() => cartItems.value.reduce((acc, m) => acc + getPrice(m.id), 0))

const { withMessage } = helpers

const form = reactive({
  name: '',
  cpf: '',
  phone: '',
  email: '',
  cep: '',
  address: '',
  city: '',
  state: '',
})
const cpfClean = computed(() => form.cpf.replace(/\D/g, '').substring(0, 14))
const phoneClean = computed(() => form.phone.replace(/\D/g, '').substring(0, 15))
const rules = {
  name: { required: withMessage('Nome é obrigatório', required) },
  cpf: {
    required: withMessage('CPF é obrigatório', () => !!cpfClean.value),
    numeric: withMessage('Apenas números', () => /^\d+$/.test(cpfClean.value)),
    minLength: withMessage('CPF deve ter no mínimo 11 dígitos', () => cpfClean.value.length >= 11),
  },
  phone: {
    required: withMessage('Telefone é obrigatório', () => !!phoneClean.value),
    numeric: withMessage('Apenas números', () => /^\d+$/.test(phoneClean.value)),
  },
  email: {
    required: withMessage('E-mail é obrigatório', required),
    email: withMessage('E-mail inválido', email),
  },
  cep: {
    required: withMessage('Nome é obrigatório', required),
    numeric,
    minLength: withMessage('CEP deve ter no 8 dígitos', minLength(8)),
  },
  address: { required: withMessage('Nome é obrigatório', required) },
  city: { required: withMessage('Nome é obrigatório', required) },
  state: { required: withMessage('Nome é obrigatório', required) },
}

const v$ = useVuelidate(rules, form)

function submit() {
  v$.value.$touch()

  if (!v$.value.$invalid) {
    console.log('Compra finalizada:', form)
  }
}

function removeFromCart(id: number) {
  store.commit('cart/removeFromCart', id)
}
</script>

<template>
  <div class="checkout-container">
    <h2>Finalizar Compra</h2>

    <div class="checkout-content-container">
      <form class="form" @submit.prevent="submit">
        <InputField v-model="form.name" label="Nome Completo" name="name" :validation="v$.name" />

        <div class="row">
          <InputField
            v-model="form.cpf"
            label="CPF"
            name="cpf"
            :validation="v$.cpf"
            @update:modelValue="(val) => (form.cpf = maskCPF(val))"
            maxlength="14"
          />
          <InputField
            v-model="form.phone"
            label="Celular"
            name="phone"
            :validation="v$.phone"
            @update:modelValue="(val) => (form.phone = maskPhone(val))"
            maxlength="15"
          />
        </div>

        <InputField
          v-model="form.email"
          label="E-mail"
          name="email"
          type="email"
          :validation="v$.email"
        />

        <div class="row">
          <InputField v-model="form.cep" label="CEP" name="cep" :validation="v$.cep" />
          <InputField
            v-model="form.address"
            label="Endereço"
            name="address"
            :validation="v$.address"
          />
        </div>

        <div class="row">
          <InputField v-model="form.city" label="Cidade" name="city" :validation="v$.city" />
          <InputField v-model="form.state" label="Estado" name="state" :validation="v$.state" />
        </div>
      </form>

      <div class="summary">
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>Qtd</th>
                <th>Preço</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movie in cartItems" :key="movie.id">
                <td>
                  <img
                    class="movie-img"
                    :src="`https://image.tmdb.org/t/p/w92${movie.poster_path}`"
                    alt=""
                  />
                </td>
                <td class="movie-name">{{ movie.title }}</td>
                <td>1</td>
                <td class="movie-price">{{ formatCurrency(getPrice(movie.id)) }}</td>
                <td>
                  <AppTooltip text="Remover do carrinho" position="left">
                    <button
                      aria-label="Remover do carrinho"
                      class="movie-remove"
                      @click="removeFromCart(movie.id)"
                    >
                      <PhTrash size="20" weight="fill" title="Remover do carrinho" />
                    </button>
                  </AppTooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="summary-footer">
          <div class="total">
            Total: <strong>{{ formatCurrency(total) }}</strong>
          </div>

          <AppButton fullWidth size="lg" :disabled="v$.$invalid" @click="submit">
            Finalizar
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped scss>
.checkout-container {
  padding-bottom: 148px;

  @media (min-width: 768px) {
    padding-bottom: initial;
  }

  h2 {
    color: var(--color-heading);
    font-size: 1.5rem;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }
}

.checkout-content-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
}

.form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input-group {
    width: 100%;
  }

  .row {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
      gap: 1rem;
    }
  }
}

.summary {
  @media (min-width: 768px) {
    width: 400px;
  }

  .summary-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 1rem 1rem;
    background-color: var(--color-background-soft);
    box-shadow: 0 -2px 6px var(--color-shadow-soft);

    @media (min-width: 768px) {
      position: initial;
      padding: initial;
      background-color: initial;
      box-shadow: initial;
    }
  }
}

.table-wrapper {
  @media (min-width: 768px) {
    overflow-y: auto;
    max-height: 420px;
  }
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

tr:not(:last-child) {
  border-bottom: 1px solid var(--color-border);
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  vertical-align: middle;
}

.movie-img {
  width: 40px;
  height: 60px;
  object-fit: cover;
}

.movie-name,
.movie-price {
  font-weight: semibold;
}

.movie-remove {
  background: transparent;
  border: none;
  color: var(--color-text-light);
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-text);
  }
}

.total {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  text-align: right;
  font-size: 1.2rem;
  margin-top: 1rem;
  margin-bottom: 2rem;

  strong {
    font-weight: bold;
  }
}
</style>
