import { createStore } from 'vuex'
import toast from './modules/toast'
import cart from './modules/cart'
import favorites from './modules/favorites'
import type { Store as VuexStore } from 'vuex/types/index.d.ts'
import type { RootState } from './types'

export default createStore({
  modules: {
    toast,
    cart,
    favorites,
  },
})

export * from './useStore'

export type Store = VuexStore<RootState>
export type * from './types'
