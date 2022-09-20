<script setup lang="ts">
import useCustomersApi from '~~/composables/customers/useCustomersApi';
import useUtilities from '~~/composables/utilities/useUtilities';

const { apiGetCustomers, customerData, reloadCustomerData } = useCustomersApi()
const { formatPhoneNumber,
  formatDate,
  formatCurrency,
  computeOrders,
  computePayments, } = useUtilities()

await reloadCustomerData()
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
                  ID
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Name
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Email
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Field
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Phone
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Current Balance
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Total Payment
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="customer in customerData" :key="customer.id"
                @click="()=> {navigateTo(`/customers/${customer.id}`)}" class="cursor-pointer">
                <td class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-blue-400
                    underline
                    whitespace-nowrap
                  ">
                  {{ customer.id }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ customer.first_name + " " + customer.last_name}}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ customer.email }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ customer.area }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ customer.contact }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatCurrency(computeOrders(customer.transaction) - computePayments(customer.transaction)) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatCurrency(computePayments(customer.transaction)) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>