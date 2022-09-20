<script setup lang="ts">
import useApi from '~~/composables/accounts/useAccountsApi';
import useAuth from '~~/composables/supabase/useAuth';

const authError = ref("");
const authErrorField = ref<boolean>(false);
const { user, supabaseSignIn } = useAuth()
const { token, apiSignIn } = useApi()
const router = useRouter()

const input = reactive({
  email: "",
  password: "",
});

const loading = ref(false)
const handleLogin = async () => {
  try {
    loading.value = true
    await apiSignIn(input.email, input.password)
    await supabaseSignIn(input.email, input.password)
    router.push('/')
  } catch (error) {
    authError.value = error.message;
    authErrorField.value = true;
  } finally {
    loading.value = false
  }
}

</script>

<template>

  <div>
    <NCard class="card">
      <div>
        <img class="mx-auto h-42 w-auto" src="../../assets/images/login-image.png" alt="Your Company" />
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-200">Sign in to your account</h2>
      </div>
      <div>
        <div class="input-container">
          <input :class="authErrorField ? 'error-input' : 'normal-input'" type="Email" placeholder="Email"
            v-model="input.email" />
          <input :class="authErrorField ? 'error-input' : 'normal-input'" type="Password" placeholder="Password"
            v-model="input.password" />
        </div>
        <p class="error mb-4" v-if="authError">{{ authError }}</p>
        <div>
          <button @click="handleLogin"
            class="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-400 py-2 px-4 text-sm font-medium text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            </span>
            Sign in
          </button>
        </div>
      </div>
    </Ncard>
  </div>
</template>

<style scoped>
.card {
  padding: 1rem;
  width: 25rem;
}

.card h3 {
  font-size: 1.5rem;
}

.input-container {
  padding: 1rem 0 1rem 0;
  display: flex;
  flex-direction: column;
}

.normal-input {
  margin-bottom: 0.3rem;
  padding: 0.2rem;
  outline: none;
  border: 0.1rem solid rgba(143, 137, 137, 0.1);
}

.error {
  color: rgb(250, 86, 71);
  font-size: 1rem;
}

.error-input {
  margin-bottom: 0.3rem;
  padding: 0.2rem;
  outline: none;
  border: 0.06rem solid rgb(252, 129, 118);
}

p {
  color: rgb(86, 141, 229);
  font-size: 0.8rem;
  cursor: pointer;
}

.confirmation-container {
  margin: 0 auto;
  padding: 1rem;
}

.confirmation-message {
  text-align: center;
}
</style>
