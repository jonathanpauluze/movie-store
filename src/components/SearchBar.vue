<script setup lang="ts">
import InputField from './form/InputField.vue'

type PropTypes = {
  modelValue: string
}
defineProps<PropTypes>()

type EmitType = (e: 'update:modelValue', value: string) => void
const emit = defineEmits<EmitType>()
</script>

<template>
  <InputField
    name="search"
    placeholder="Busque um filme..."
    :model-value="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  />
</template>
