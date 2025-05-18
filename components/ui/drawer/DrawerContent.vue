<script lang="ts" setup>
import type { DialogContentEmits, DialogContentProps } from 'reka-ui'
import { useForwardPropsEmits } from 'reka-ui'
import { DrawerContent, DrawerPortal } from 'vaul-vue'
import type { HtmlHTMLAttributes } from 'vue'

import { cn } from '@/lib/utils'

import DrawerOverlay from './DrawerOverlay.vue'

const props = defineProps<DialogContentProps & { class?: HtmlHTMLAttributes['class'] }>()
const emits = defineEmits<DialogContentEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent
      v-bind="forwarded"
      :class="
        cn(
          'fixed right-0 top-0 z-50 h-full max-w-[500px] w-full flex-col pt-2 border-l bg-background shadow-lg',
          props.class
        )
      "
    >
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>
