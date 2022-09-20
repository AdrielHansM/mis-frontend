<script setup lang="ts">
import useApi from '~~/composables/accounts/useAccountsApi';
import useUtilities from '~~/composables/utilities/useUtilities';

const { apiGetAccounts } = useApi()
const { formatDate } = useUtilities()

const userData = ref<Account[]>()
const loading = ref(true)

if (loading) {
  try {
    userData.value = await apiGetAccounts()
  } catch (error) { throw Error }
  if (!!userData) {
    loading.value = false
  }
}

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
                  Date Updated
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
                    text-center text-gray-800
                    uppercase
                  ">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="account in userData" :key="account.id">
                <td class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-200
                    whitespace-nowrap
                  ">
                  {{ account.id }}
                </td>
                <td class="
                    px-6
                    py-4
                    text-sm
                    font-medium
                    text-gray-200
                    whitespace-nowrap
                  ">
                  {{ account.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ account.email }}
                </td>
                <td class="px-8 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatDate(account.updated_at) }}
                </td>
                <td class="px-8 py-4 text-sm text-gray-300 whitespace-nowrap">
                  {{ formatDate(account.created_at) }}
                </td>
                <td class="px-6 py-4 text-sm text-center font-medium">
                  <a class="text-blue-500 hover:text-blue-700 mr-4" href="#">
                    view
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>