<script lang="ts">
import { defineComponent, h, ref } from 'vue'

export default defineComponent({
  name: 'CodeGroup',
  setup(_, { slots }) {
    const activeIndex = ref(0)

    return () => {
      const rawChildren = slots.default?.() || []
      const blocks = rawChildren.filter(
        (vnode) => vnode && typeof vnode.type !== 'symbol'
      )

      if (!blocks.length) {
        return null
      }

      const safeIndex = activeIndex.value < blocks.length ? activeIndex.value : 0

      return h('div', { class: 'nc-code-group' }, [
        h(
          'div',
          { class: 'nc-code-group-tabs', role: 'tablist' },
          blocks.map((block, idx) => {
            const label =
              (block.props?.filename as string) ||
              (block.props?.language as string) ||
              `Tab ${idx + 1}`
            const isActive = idx === safeIndex
            return h(
              'button',
              {
                key: `${label}-${idx}`,
                type: 'button',
                role: 'tab',
                'aria-selected': isActive ? 'true' : 'false',
                class: ['nc-code-group-tab', { 'is-active': isActive }],
                onClick: () => {
                  activeIndex.value = idx
                }
              },
              label
            )
          })
        ),
        h(
          'div',
          { class: 'nc-code-group-panels' },
          blocks.map((block, idx) =>
            h(
              'div',
              {
                key: idx,
                role: 'tabpanel',
                class: ['nc-code-group-panel', { 'is-hidden': idx !== safeIndex }]
              },
              [block]
            )
          )
        )
      ])
    }
  }
})
</script>
