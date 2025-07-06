<script setup lang="ts">
type PropsType = {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

defineProps<PropsType>()
</script>

<template>
  <div class="tooltip" :class="position">
    <slot />
    <span class="tooltip-text">{{ text }}</span>
  </div>
</template>

<style scoped scss>
.tooltip {
  position: relative;
  display: inline-block;

  .tooltip-text {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    background-color: var(--color-background-reverse-soft);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    z-index: 10;
    transition: opacity 0.2s;

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
    }
  }

  &:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
  }

  &.top {
    .tooltip-text {
      bottom: 125%;
      left: 50%;
      transform: translateX(-50%);

      &::after {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 5px 5px 0 5px;
        border-color: var(--color-background-reverse-soft) transparent transparent transparent;
      }
    }
  }

  &.bottom {
    .tooltip-text {
      top: 125%;
      left: 50%;
      transform: translateX(-50%);

      &::after {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0 5px 5px 5px;
        border-color: transparent transparent var(--color-background-reverse-soft) transparent;
      }
    }
  }

  &.left {
    .tooltip-text {
      right: 125%;
      top: 50%;
      transform: translateY(-50%);

      &::after {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 5px 0 5px 5px;
        border-color: transparent transparent transparent var(--color-background-reverse-soft);
      }
    }
  }

  &.right {
    .tooltip-text {
      left: 125%;
      top: 50%;
      transform: translateY(-50%);

      &::after {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 5px 5px 5px 0;
        border-color: transparent var(--color-background-reverse-soft) transparent transparent;
      }
    }
  }
}
</style>
