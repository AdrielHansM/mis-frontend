<script setup lang="ts">

definePageMeta({
  middleware: "auth",
})

</script>

<template>
  <div class="container pl-30">
    <h3 class="mt-10 mb-5 text-2xl font-sans bg">Inventory</h3>
    <ProductInventoryList />
    <ProductInventoryForm />
  </div>
</template>

<style scoped>
.container {
  max-width: 80%;
  margin: 0 auto;
}
</style>