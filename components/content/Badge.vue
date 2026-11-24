<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'tip' | 'info' | 'warning' | 'danger'
    text?: string
  }>(),
  {
    type: 'tip',
    text: ''
  }
)
</script>

<template>
  <span :class="['nc-badge', `nc-badge--${type}`]">
    <template v-if="text">{{ text }}</template>
    <slot v-else />
  </span>
</template>
