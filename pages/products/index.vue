
<script setup lang="ts">
import useApi from '~~/composables/accounts/useAccountsApi';
import useAuth from '~~/composables/supabase/useAuth';

const { user, supabaseIsLoggedIn } = useAuth()
const { token, apiIsLoggedIn } = useApi()

definePageMeta({
  middleware: "auth",
})

</script>

<template>
  <div class="container">
    <div class="pt-10">
      <h3 class="text-2xl font-sans mb-5">Products</h3>
      <ProductList />
      <ProductForm />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 60%;
  margin: 0 auto;
}
</style>