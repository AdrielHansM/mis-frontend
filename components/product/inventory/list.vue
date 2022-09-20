<script setup lang="ts">
import useInventoryApi from '~~/composables/products/useInventoryApi';
import useUtilities from '~~/composables/utilities/useUtilities';

const { inventoryData, reloadInventoryData } = useInventoryApi()
const {
  formatDate
} = useUtilities()

await reloadInventoryData()

</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="p-1.5 w-full inline-block align-middle">
        <div class="overflow-hidden border rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
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
                  Product ID
                </th>
                <th scope="col" class="
                                                    px-6
                                                    py-3
                                                    text-xs
                                                    font-bold
                                                    text-left text-gray-800
                                                    uppercase
                                                  ">
                  Product Name
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
                  No. of Orders
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
                  Date Added
                </th>
              </tr>
            </thead>
            <tbody v-if="inventoryData" class="divide-y divide-gray-200">
              <tr v-for="inventory in inventoryData" :key="inventory.id">
                <td class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-200
                    whitespace-nowrap
                  ">
                  {{ inventory.id }}
                </td>
                <td class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-200
                    whitespace-nowrap
                  ">
                  {{ inventory.product_id }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ inventory.product.product_name }}
                </td>
                <td class="px-8 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ inventory.quantity }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ inventory.orderItem?.length }}
                </td>
                <td class="px-8 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatDate(inventory.expiry_date) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatDate(inventory.created_at) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatDate(inventory.updated_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>