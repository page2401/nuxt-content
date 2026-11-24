<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'tip' | 'warning' | 'danger'
    title?: string
  }>(),
  {
    type: 'info',
    title: ''
  }
)

const meta = computed(() => {
  switch (props.type) {
    case 'tip':
      return { icon: '✦', defaultTitle: 'TIP' }
    case 'warning':
      return { icon: '⚠', defaultTitle: 'WARNING' }
    case 'danger':
      return { icon: '⛔', defaultTitle: 'DANGER' }
    default:
      return { icon: 'ℹ', defaultTitle: 'INFO' }
  }
})

const displayTitle = computed(() => props.title || meta.value.defaultTitle)
</script>

<template>
  <aside :class="['nc-callout', `nc-callout--${props.type}`]" role="note">
    <div class="nc-callout-header">
      <span aria-hidden="true">{{ meta.icon }}</span>
      <span>{{ displayTitle }}</span>
    </div>
    <div class="nc-callout-body">
      <slot />
    </div>
  </aside>
</template>
