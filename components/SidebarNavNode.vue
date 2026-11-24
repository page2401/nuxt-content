<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { computed } from 'vue'

const props = defineProps<{
  item: ContentNavigationItem
  currentPath: string
}>()

const emit = defineEmits<{
  (e: 'navigate'): void
}>()

const normalizedItemPath = computed(() =>
  props.item.path === '/' ? '/' : props.item.path.replace(/\/+$/, '')
)

const isActive = computed(() => props.currentPath === normalizedItemPath.value)

const hasChildren = computed(() => Array.isArray(props.item.children) && props.item.children.length > 0)

const filteredChildren = computed(() => {
  if (!props.item.children) return []
  return props.item.children
})
</script>

<template>
  <li>
    <div v-if="item.page === false" class="nc-nav-group-label">
      <span>{{ item.title }}</span>
    </div>
    <NuxtLink
      v-else
      :to="item.path"
      :class="['nc-nav-link', { 'is-active': isActive }]"
      @click="emit('navigate')"
    >
      <span>{{ item.title }}</span>
      <span v-if="item.badge" class="nc-badge nc-badge--tip">{{ item.badge }}</span>
    </NuxtLink>

    <ul v-if="hasChildren" class="nc-nav-sublist">
      <SidebarNavNode
        v-for="child in filteredChildren"
        :key="child.path + (child.page === false ? ':group' : ':page')"
        :item="child"
        :current-path="currentPath"
        @navigate="emit('navigate')"
      />
    </ul>
  </li>
</template>
