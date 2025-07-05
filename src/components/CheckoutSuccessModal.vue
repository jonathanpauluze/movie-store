<script setup lang="ts">
import AppModal from './AppModal.vue'
import AppButton from './AppButton.vue'

type PropsType = {
  visible: boolean
  name: string
}
defineProps<PropsType>()

defineEmits(['close'])
</script>

<template>
  <AppModal :visible="visible" @close="$emit('close')">
    <div class="success-box">
      <h3>Obrigado {{ name }}!</h3>
      <p>Sua compra foi finalizada com sucesso!</p>
      <AppButton fullWidth @click="$emit('close')">Ir para loja</AppButton>
    </div>
  </AppModal>
</template>

<style scoped scss>
.success-box {
  padding: 2rem;
  text-align: center;

  h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1rem;
  }
}
</style>
