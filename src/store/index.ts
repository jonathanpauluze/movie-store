import { createStore } from 'vuex'
import cart from './modules/cart'
import toast from './modules/toast'

export default createStore({
  modules: {
    cart,
    toast,
  },
})
