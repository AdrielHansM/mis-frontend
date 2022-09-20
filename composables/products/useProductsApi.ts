import useApi from "../accounts/useAccountsApi"

const useProductsApi = () => {
  const runtimeConfig = useRuntimeConfig()
  const { token } = useApi()
  const productData = useState<Product[]>('product', () => [])
  const productDetails = useState<Product>('product', () => null)


  const reload = useState("reload", () => false);

  const reloadProductDetails = async (id: string) => {
    const response: Product = await $fetch(runtimeConfig.public.API_URL + `/products/${id}`, {
      method: 'GET'
    })

    productDetails.value = response
  }

  const reloadProductData = async () => {
    productData.value = await apiGetProducts()
  }

  const emitReload = () => {
    reload.value = !reload.value
  }

  const apiGetProducts = async () => {
    const response: ProductResponse = await $fetch(runtimeConfig.public.API_URL + '/products', {
      method: 'GET'
    })
    const products: Product[] = response.data.data
    return products;
  }

  const apiGetManufacturers = async () => {
    const response: ManufacturerResponse = await $fetch(runtimeConfig.public.API_URL + '/manufacturer', {
      method: 'GET'
    })
    const manufacturers: Manufacturer[] = response.data.data
    return manufacturers;
  }

  const apiPostProduct = async (product: Product) => {

    const requestBody = {
      product_name: product.product_name,
      manufacturer_id: product.manufacturer_id,
      price: product.price,
      type: product.type,
      category: product.category,
      dosage: product.dosage,
      image_url: product.image_url
    }

    try {
      const response = await $fetch(runtimeConfig.public.API_URL + '/products', {
        headers: {
          "Authorization": `Bearer ${token.value}`
        },
        method: 'POST',
        body: requestBody
      });
      return response;
    } catch (error) { throw error }
  }

  return {
    reload,
    token,
    productData,
    productDetails,
    reloadProductData,
    reloadProductDetails,
    emitReload,
    apiPostProduct,
    apiGetProducts,
    apiGetManufacturers,
  }
}

export default useProductsApi