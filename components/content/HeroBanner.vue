<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  tagline: string
  primaryText?: string
  primaryLink?: string
  secondaryText?: string
  secondaryLink?: string
  tertiaryText?: string
  tertiaryLink?: string
}>()
</script>

<template>
  <section class="nc-hero">
    <div v-if="eyebrow" class="nc-hero-eyebrow">{{ eyebrow }}</div>
    <h1 class="nc-hero-title">{{ title }}</h1>
    <p class="nc-hero-tagline">{{ tagline }}</p>
    <div class="nc-hero-actions">
      <NuxtLink v-if="primaryText && primaryLink" :to="primaryLink" class="nc-btn-primary">
        {{ primaryText }}
      </NuxtLink>
      <NuxtLink v-if="secondaryText && secondaryLink" :to="secondaryLink" class="nc-btn-secondary">
        {{ secondaryText }}
      </NuxtLink>
      <NuxtLink v-if="tertiaryText && tertiaryLink" :to="tertiaryLink" class="nc-btn-secondary">
        {{ tertiaryText }}
      </NuxtLink>
    </div>
  </section>
</template>
