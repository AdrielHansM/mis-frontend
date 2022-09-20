import useApi from "../accounts/useAccountsApi"

const useCustomersApi = () => {
  const runtimeConfig = useRuntimeConfig()
  const { token } = useApi()
  const customerData = useState<Customer[]>('customer', () => [])
  const customerDetails = useState<Customer>('customerDetails', () => null)


  const reloadCustomerData = async () => {
    customerData.value = await apiGetCustomers()
  }

  const reloadCustomerDetails = async (id: string) => {
    const response: Customer = await $fetch(runtimeConfig.public.API_URL + `/customers/${id}`, {
      method: 'GET'
    })

    //@ts-ignore
    customerDetails.value = response.data
  }

  const apiGetCustomers = async () => {
    try {
      const response: CustomerResponse = await $fetch(runtimeConfig.public.API_URL + '/customers', {
        method: 'GET'
      })
      const customers: Customer[] = response.data.data
      return customers
    } catch (error) { throw error }
  }

  const apiPostCustomer = async (customer: Customer) => {
    try {
      const response = await $fetch(runtimeConfig.public.API_URL + '/customers', {
        headers: {
          "Authorization": `Bearer ${token.value}`
        },
        method: 'POST',
        body: customer
      });
      return response;
    } catch (error) { throw error }
  }

  const apiPatchCustomer = async (customer: Customer, id: number) => {
    console.log(token.value)
    console.log(runtimeConfig.public.API_URL + `/customers/${id}`);

    try {
      const response = await $fetch("https://vast-taiga-66201.herokuapp.com/" + runtimeConfig.public.API_URL + `/customers/${id}`, {
        headers: {
          "Authorization": `Bearer ${token.value}`
        },
        method: 'PATCH',
        body: customer
      });
      return response;
    } catch (error) { throw error }
  }

  return {
    token,
    customerData,
    customerDetails,
    reloadCustomerDetails,
    reloadCustomerData,
    apiGetCustomers,
    apiPostCustomer,
    apiPatchCustomer
  }
}

export default useCustomersApi