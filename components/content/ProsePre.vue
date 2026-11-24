<script setup lang="ts">
import MermaidBlock from './MermaidBlock.vue'

const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array,
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})
</script>

<template>
  <MermaidBlock v-if="props.language === 'mermaid'" :code="props.code" />
  <div v-else class="nc-code-wrap">
    <div v-if="props.language || props.filename" class="nc-code-header">
      <span>{{ props.filename || props.language }}</span>
    </div>
    <pre :class="props.class"><slot /></pre>
  </div>
</template>
