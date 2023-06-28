<script setup lang="ts">
const { data, error } = await useFetch('/api/resend')
if (error.value) {
  console.log(error.value)
}
console.log(data.value)
</script>

<template>
  <main>
    <h1>Nuxt 3 - Resend module playground</h1>
  </main>
</template>
