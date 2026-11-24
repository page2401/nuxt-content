<script setup lang="ts">
withDefaults(
  defineProps<{
    summary?: string
    open?: boolean
  }>(),
  {
    summary: '点击展开详情',
    open: false
  }
)
</script>

<template>
  <details class="nc-details-box" :open="open || undefined">
    <summary class="nc-details-summary">{{ summary }}</summary>
    <div class="nc-details-content">
      <slot />
    </div>
  </details>
</template>
