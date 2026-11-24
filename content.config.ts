import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        order: z.number().optional(),
        badge: z.string().optional(),
        category: z.string().optional()
      })
    })
  }
})
