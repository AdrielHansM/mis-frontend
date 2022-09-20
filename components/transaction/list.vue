<script setup lang="ts">
import useTransactionsApi from '~~/composables/transactions/useTransactionsApi';
import useUtilities from '~~/composables/utilities/useUtilities';

const { apiGetTransactions } = useTransactionsApi()
const { formatPhoneNumber,
  formatDate,
  formatCurrency,
  computeOrders,
  computePayments, } = useUtilities()

const transactionData = ref<Transaction[]>()
const loading = ref(true)

if (loading) {
  try {
    transactionData.value = await apiGetTransactions()
  } catch (error) { throw Error }
  if (!!transactionData) {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto">
      <div class="p-1.5 w-full inline-block align-middle">
        <div class="overflow-hidden border rounded-lg">
          <div v-if="loading">
            <h1>
              Data loading ...
            </h1>
          </div>
          <table v-else class="min-w-full divide-y divide-gray-200">
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
                  Customer ID
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Type
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Amount
                </th>
                <th scope="col" class="
                    px-6
                    py-3
                    text-xs
                    font-bold
                    text-left text-gray-800
                    uppercase
                  ">
                  Transaction Date
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
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="transaction in transactionData" :key="transaction.id">
                <td class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-200
                    whitespace-nowrap
                  ">
                  {{ transaction.id }}
                </td>
                <td class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-200
                    whitespace-nowrap
                  ">
                  {{ transaction.customer_id }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ transaction.transaction_type }}
                </td>
                <td class="px-8 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatCurrency(transaction.total_amount) }}
                </td>
                <td class="px-8 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatDate(transaction.transaction_date) }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatDate(transaction.created_at) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>