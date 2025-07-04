import { useStore as baseUseStore } from 'vuex'
import type { Store } from './index'

export const useStore = (): Store => baseUseStore()
