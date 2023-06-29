<script setup lang="ts">
const { data, error } = await useFetch('/api/resend')
if (error.value) {
  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error?.value?.message,
  })
}
</script>
<template>
  <main>
    <h1>Nuxt 3 - Resend module playground</h1>
  </main>
</template>
