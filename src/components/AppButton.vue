<script setup lang="ts">
type PropsType = {
  variant?: 'primary' | 'outline' | 'link'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
}

const props = withDefaults(defineProps<PropsType>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  fullWidth: false,
})
</script>

<template>
  <button
    :class="['btn', props.variant, props.size, { 'full-width': props.fullWidth }]"
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped scss>
.btn {
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
  font-size: 1rem;
  display: inline-block;

  &.full-width {
    width: 100%;
    display: block;
  }

  &.sm {
    font-size: 0.875rem;
    padding: 0.375rem 0.75rem;
  }

  &.md {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  }

  &.lg {
    font-size: 1.125rem;
    padding: 0.75rem 1rem;
  }

  &.primary {
    background-color: var(--color-primary);
    color: white;
    border: none;

    &:hover {
      background-color: var(--color-primary-hover);
    }
  }

  &.outline {
    background-color: transparent;
    color: var(--color-primary);
    border: 1px solid var(--color-primary);

    &:hover {
      background-color: var(--color-primary-light);
    }
  }

  &.link {
    background: none;
    border: none;
    color: var(--color-primary);
    text-decoration: underline;
    padding: 0;

    &:hover {
      color: var(--color-primary-hover);
    }
  }
}
</style>
