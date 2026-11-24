<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const route = useRoute()
const mobileOpen = ref(false)
const isDark = ref(false)
let themeObserver: MutationObserver | null = null

const normalizedCurrentPath = computed(() =>
  route.path === '/' ? '/' : route.path.replace(/\/+$/, '')
)

const { data: navigation } = await useAsyncData('docs-navigation', () =>
  queryCollectionNavigation('docs', ['order', 'badge']).order('order', 'ASC')
)

function syncThemeState() {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  isDark.value = root.classList.contains('dark') || root.getAttribute('data-theme') === 'dark'
}

function toggleTheme() {
  if (typeof document === 'undefined') return
  const next = !isDark.value
  const root = document.documentElement
  root.classList.toggle('dark', next)
  root.setAttribute('data-theme', next ? 'dark' : 'light')
  try {
    localStorage.setItem('nuxt-content-theme', next ? 'dark' : 'light')
  } catch {
    // ignore storage restrictions
  }
  isDark.value = next
}

onMounted(() => {
  syncThemeState()
  themeObserver = new MutationObserver(() => {
    syncThemeState()
  })
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme']
  })
})

onBeforeUnmount(() => {
  if (themeObserver) {
    themeObserver.disconnect()
    themeObserver = null
  }
})
</script>

<template>
  <div class="nc-app">
    <header class="nc-header">
      <div class="nc-header-inner">
        <div style="display: flex; align-items: center; gap: 0.6rem;">
          <button
            type="button"
            class="nc-icon-btn nc-mobile-toggle"
            aria-label="切换章节导航"
            @click="mobileOpen = !mobileOpen"
          >
            ☰ 目录
          </button>
          <NuxtLink to="/" class="nc-brand" @click="mobileOpen = false">
            <span class="nc-brand-mark">N</span>
            <span>Nuxt Content</span>
            <span class="nc-version-pill">nuxt@4.7.0 · content@3.17.0</span>
          </NuxtLink>
        </div>

        <div class="nc-header-actions">
          <a
            href="https://page.2401.xyz/"
            class="nc-portal-link"
            target="_top"
          >
            ← 对比总站 (page.2401.xyz)
          </a>
          <a
            href="https://github.com/page2401/nuxt-content"
            class="nc-portal-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <button
            type="button"
            class="nc-icon-btn"
            :aria-label="isDark ? '切换至浅色模式' : '切换至深色模式'"
            @click="toggleTheme"
          >
            <span>{{ isDark ? '☀ 浅色' : '☾ 深色' }}</span>
          </button>
        </div>
      </div>
    </header>

    <div class="nc-shell">
      <aside :class="['nc-sidebar', { 'is-open': mobileOpen }]">
        <div class="nc-sidebar-caption">SQLite Content Collection</div>
        <ul v-if="navigation?.length" class="nc-nav-list">
          <SidebarNavNode
            v-for="item in navigation"
            :key="item.path"
            :item="item"
            :current-path="normalizedCurrentPath"
            @navigate="mobileOpen = false"
          />
        </ul>
      </aside>

      <NuxtPage />
    </div>
  </div>
</template>
