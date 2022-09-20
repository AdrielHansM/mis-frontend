<script setup lang="ts">
import useApi from '~~/composables/accounts/useAccountsApi';
import useAuth from '~~/composables/supabase/useAuth';


const { supabaseIsLoggedIn } = useAuth()
const { apiIsLoggedIn } = useApi()


</script>
<template>
  <div>
    <div :class="supabaseIsLoggedIn() ? '' : 'hidden'">
      <Nav />
    </div>
    <slot />
  </div>
</template>