<script setup lang="ts">
import useProductsApi from '~~/composables/products/useProductsApi';
import useUtilities from '~~/composables/utilities/useUtilities';

const { productDetails, reloadProductDetails, productData } = useProductsApi()
const { formatDate, formatCurrency } = useUtilities()

const route = useRoute()
const id = route.params.id;
await reloadProductDetails(id.toString())

</script>

<template>
  <div v-for="product in productData" class="overflow-hidden">
    <div class="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <div class="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
        <img class="w-full" :alt="product.product_name" :src="product.image_url" />

      </div>
      <div class="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div class="flex border-b border-gray-200 pb-6">
          <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 dark:text-gray-100 mt-2">
            {{ product.product_name }}
          </h1>
          <!-- <button class="ml-3 mt-2 text-base flex items-center justify-center leading-none w-6 ">
            <img class="invert" src="https://cdn-icons-png.flaticon.com/512/2623/2623081.png" alt="location">
          </button> -->
        </div>
        <p class="md:w-96 text-lg leading-normal text-gray-600 dark:text-gray-100 mt-4">Manufacturer: {{
        product.manufacturer.name }}</p>
        <div>
          <p class="text-base leading-4 mt-7 text-gray-600 dark:text-gray-300">Product ID: {{ product.id }}</p>
          <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Price: {{ formatCurrency(product.price)
          }}</p>
          <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Dosage: {{ product.dosage }}</p>
          <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Type: {{ product.type }}</p>
          <p class="text-base leading-4 mt-4 text-gray-600 dark:text-gray-300">Category: {{ product.category }}</p>
        </div>
        <div>
          <div class="border-t border-b py-4 mt-7 border-gray-200">
            <div data-menu class="flex justify-between items-center">
              <h3 class="text-2xl text-gray-200">Available Inventory</h3>
            </div>
            <div class=" pt-4 text-base leading-normal pr-12 text-gray-600 dark:text-gray-300" id="sect">
              <table v-if="product?.inventory.length" class="w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                      ID#
                    </th>
                    <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                      Quantity
                    </th>
                    <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                      Expiry Date
                    </th>
                    <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                      Date Created
                    </th>
                    <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                      Date Updated
                    </th>

                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr v-for="inventoryItem in product.inventory" :key="inventoryItem.id">
                    <td class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-200
                    whitespace-nowrap
                  ">
                      {{ inventoryItem.id }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                      {{ inventoryItem.quantity }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                      {{ formatDate(inventoryItem.expiry_date) }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                      {{ formatDate(inventoryItem.created_at) }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                      {{ formatDate(inventoryItem.updated_at) }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else>
                <h1>No recorded inventory yet</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

