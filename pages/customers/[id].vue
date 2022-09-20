<script setup lang="ts">

definePageMeta({
  middleware: "auth",
})

</script>

<template>
  <div class="container mt-10 p-5 mx-auto">
    <CustomerDetails />
    <CustomerProfileTransaction />
  </div>
</template>

<style scoped>
.container {
  max-width: 60%;
}
</style>
