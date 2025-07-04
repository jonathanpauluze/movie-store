<script setup lang="ts">
import { computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'

type PropTypes = {
  modelValue: string
  label: string
  name: string
  type?: string
  placeholder?: string
  validation?: ReturnType<typeof useVuelidate>['value']['name']
}
const props = defineProps<PropTypes>()

type EmitType = (event: 'update:modelValue', value: string) => void
const emit = defineEmits<EmitType>()

const showError = computed(() => {
  return props.validation?.$dirty && props.validation?.$invalid
})

const errorMessage = computed(() => {
  if (!props.validation) return ''

  const firstError = Object.entries(props.validation.$errors?.[0] ?? {})?.[1]

  return (
    props.validation?.$errors?.[0]?.$message ??
    (typeof firstError === 'string' ? firstError : 'Campo inválido')
  )
})

const inputId = computed(() => `input-${props.name}`)
</script>

<template>
  <div class="input-group">
    <label :for="inputId" class="input-label">{{ label }}</label>

    <input
      :id="inputId"
      :name="name"
      :type="type || 'text'"
      :placeholder="placeholder || ''"
      :value="modelValue"
      :aria-invalid="showError ? 'true' : undefined"
      :aria-describedby="showError ? `${inputId}-error` : undefined"
      class="input-field"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="validation?.$touch()"
    />

    <p v-if="showError" :id="`${inputId}-error`" class="input-error" role="alert">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.input-label {
  font-weight: 500;
}

.input-field {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.input-field[aria-invalid='true'] {
  border-color: var(--color-danger);
}

.input-error {
  color: var(--color-danger);
  font-size: 0.875rem;
}
</style>
