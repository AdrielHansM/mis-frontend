<script setup lang="ts">
import useApi from '~~/composables/accounts/useAccountsApi';
import useAuth from '~~/composables/supabase/useAuth';

const { user, supabaseIsLoggedIn } = useAuth()
const { token, apiIsLoggedIn } = useApi()

</script>

<template>
  <div class="container">
    <AuthLogin />
  </div>
</template>


<style scoped>
.container {
  max-width: 50%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}
</style>