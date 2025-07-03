import { createStore } from 'vuex'
import toast from './modules/toast'
import cart from './modules/cart'
import favorites from './modules/favorites'

export default createStore({
  modules: {
    toast,
    cart,
    favorites,
  },
})

export type * from './types'
