<template>
  <nav v-if="meta && meta.last_page > 1" class="d-flex justify-content-center mt-3">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: meta.current_page === 1 }">
        <button class="page-link" @click="$emit('cambiar', meta.current_page - 1)">&laquo;</button>
      </li>
      <li
        v-for="p in pages"
        :key="p"
        class="page-item"
        :class="{ active: p === meta.current_page }"
      >
        <button class="page-link" @click="$emit('cambiar', p)">{{ p }}</button>
      </li>
      <li class="page-item" :class="{ disabled: meta.current_page === meta.last_page }">
        <button class="page-link" @click="$emit('cambiar', meta.current_page + 1)">&raquo;</button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ meta: Object })
defineEmits(['cambiar'])

const pages = computed(() => {
  if (!props.meta) return []
  const total = props.meta.last_page
  const current = props.meta.current_page
  const delta = 2
  const range = []
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i)
  }
  return range
})
</script>
