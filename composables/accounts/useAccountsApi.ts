const useApi = () => {
  const runtimeConfig = useRuntimeConfig()
  const token = useState('token', () => null)

  const apiSignIn = async (email: string, password: string) => {
    try {
      const response: Token = await $fetch(runtimeConfig.public.API_URL + "/auth/login", {
        method: 'POST',
        body: {
          email: email,
          password: password,
        }
      })
      token.value = response.data.token
    } catch (error) { throw error }
  }

  const apiSignOut = () => {
    token.value = ''
  }

  const apiIsLoggedIn = () => {
    return !!token.value
  }

  const apiSignUp = async (name: string, email: string, password: string) => {
    try {
      const response: Token = await $fetch(runtimeConfig.public.API_URL + "/auth/register", {
        method: 'POST',
        body: {
          name: name,
          email: email,
          password: password
        }
      })

      return response;
    } catch (error) {
      throw error
    }
  }

  const apiGetAccounts = async () => {
    const response: AccountResponse = await $fetch(runtimeConfig.public.API_URL + '/auth/accounts', {
      method: "GET"
    })
    const accounts: Account[] = response.data.data
    return accounts
  }

  return {
    token,
    apiSignIn,
    apiSignOut,
    apiIsLoggedIn,
    apiSignUp,
    apiGetAccounts,
  }
}

export default useApi