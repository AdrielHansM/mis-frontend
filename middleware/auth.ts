import useApi from "~~/composables/accounts/useAccountsApi";
import useAuth from "~~/composables/supabase/useAuth";

export default defineNuxtRouteMiddleware(() => {
  const { supabaseIsLoggedIn } = useAuth();
  const { apiIsLoggedIn } = useApi();

  if (!supabaseIsLoggedIn() && !apiIsLoggedIn()) {
    return navigateTo("/login")
  }
})