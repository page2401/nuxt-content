<script setup lang="ts">
import { computed } from 'vue'

const route = useRoute()

const normalizedPath = computed(() =>
  route.path === '/' ? '/' : route.path.replace(/\/+$/, '')
)

const { data: page } = await useAsyncData(
  () => `docs-page:${normalizedPath.value}`,
  () => queryCollection('docs').path(normalizedPath.value).first(),
  { watch: [normalizedPath] }
)

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: `未找到文档页面: ${normalizedPath.value}`,
    fatal: true
  })
}

const { data: surroundings } = await useAsyncData(
  () => `docs-surround:${normalizedPath.value}`,
  () =>
    queryCollectionItemSurroundings('docs', normalizedPath.value, {
      fields: ['title', 'description']
    }).order('order', 'ASC'),
  { watch: [normalizedPath] }
)

useSeoMeta({
  title: () => page.value?.title || 'Nuxt Content v3',
  description: () => page.value?.description || ''
})

const tocLinks = computed(() => page.value?.body?.toc?.links || [])
const prevPage = computed(() => surroundings.value?.[0] || null)
const nextPage = computed(() => surroundings.value?.[1] || null)
</script>

<template>
  <main class="nc-main">
    <article v-if="page" class="nc-prose">
      <ContentRenderer :value="page" />
    </article>

    <nav v-if="prevPage || nextPage" class="nc-surround" aria-label="章节前后翻页">
      <NuxtLink v-if="prevPage" :to="prevPage.path" class="nc-surround-card">
        <span class="nc-surround-label">← 上一篇</span>
        <span class="nc-surround-title">{{ prevPage.title }}</span>
      </NuxtLink>
      <div v-else />

      <NuxtLink v-if="nextPage" :to="nextPage.path" class="nc-surround-card is-next">
        <span class="nc-surround-label">下一篇 →</span>
        <span class="nc-surround-title">{{ nextPage.title }}</span>
      </NuxtLink>
    </nav>
  </main>

  <aside class="nc-toc" aria-label="本页目录">
    <template v-if="tocLinks.length">
      <div class="nc-toc-title">本页大纲 (TOC)</div>
      <ul class="nc-toc-list">
        <li v-for="link in tocLinks" :key="link.id">
          <a :href="`#${link.id}`" class="nc-toc-link">{{ link.text }}</a>
          <ul v-if="link.children?.length" class="nc-toc-sublist">
            <li v-for="sub in link.children" :key="sub.id">
              <a :href="`#${sub.id}`" class="nc-toc-link">{{ sub.text }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </aside>
</template>
