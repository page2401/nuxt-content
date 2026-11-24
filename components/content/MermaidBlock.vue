<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    code?: string
  }>(),
  {
    code: ''
  }
)

const svgHtml = ref('')
const renderError = ref('')
let observer: MutationObserver | null = null
let renderSeq = 0

function detectDark(): boolean {
  if (typeof document === 'undefined') return false
  const root = document.documentElement
  return root.classList.contains('dark') || root.getAttribute('data-theme') === 'dark'
}

async function renderDiagram() {
  const source = (props.code || '').trim()
  if (!source || typeof window === 'undefined') return
  const currentSeq = ++renderSeq
  try {
    const mermaidModule = await import('mermaid')
    const mermaid = mermaidModule.default || mermaidModule
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'loose',
      theme: detectDark() ? 'dark' : 'default'
    })
    const id = `nc-mermaid-${Math.random().toString(36).slice(2, 9)}-${currentSeq}`
    const { svg } = await mermaid.render(id, source)
    if (currentSeq === renderSeq) {
      svgHtml.value = svg
      renderError.value = ''
    }
  } catch (err: unknown) {
    if (currentSeq === renderSeq) {
      renderError.value = err instanceof Error ? err.message : String(err)
    }
  }
}

onMounted(() => {
  renderDiagram()
  observer = new MutationObserver(() => {
    renderDiagram()
  })
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme']
  })
})

watch(() => props.code, () => {
  renderDiagram()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
})
</script>

<template>
  <div class="nc-mermaid" data-mermaid-rendered="true">
    <div v-if="svgHtml" class="nc-mermaid-svg" v-html="svgHtml" />
    <pre v-else-if="renderError" class="nc-mermaid-error">{{ renderError }}</pre>
    <pre v-else class="nc-mermaid-fallback">{{ code }}</pre>
  </div>
</template>
