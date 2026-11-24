<script setup lang="ts">
defineProps<{
  title: string
  to?: string
}>()
</script>

<template>
  <div class="nc-feature-card">
    <div class="nc-feature-card-title">
      <NuxtLink v-if="to" :to="to">{{ title }}</NuxtLink>
      <span v-else>{{ title }}</span>
    </div>
    <div class="nc-feature-card-body">
      <slot />
    </div>
  </div>
</template>
