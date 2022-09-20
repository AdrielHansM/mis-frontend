import useApi from "../accounts/useAccountsApi"

const useInventoryApi = () => {
  const runtimeConfig = useRuntimeConfig()
  const { token } = useApi()
  const inventoryData = useState<Inventory[]>('inventory', () => [])

  const reloadInventoryData = async () => {
    inventoryData.value = await apiGetInventory()
  }

  const apiGetInventory = async () => {
    const response: InventoryResponse = await $fetch(runtimeConfig.public.API_URL + '/inventory', {
      method: 'GET'
    })
    const inventories: Inventory[] = response.data.data
    return inventories;
  }

  const apiPostInventory = async (inventory: Inventory) => {
    try {
      const response = await $fetch(runtimeConfig.public.API_URL + '/inventory', {
        headers: {
          "Authorization": `Bearer ${token.value}`
        },
        method: 'POST',
        body: inventory
      });
      return response;
    } catch (error) { throw error }
  }

  return {
    token,
    inventoryData,
    reloadInventoryData,
    apiGetInventory,
    apiPostInventory
  }
}

export default useInventoryApi