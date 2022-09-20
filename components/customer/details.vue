<script setup lang="ts">import useCustomersApi from '~~/composables/customers/useCustomersApi';
import useUtilities from '~~/composables/utilities/useUtilities';

const { customerDetails, reloadCustomerDetails, apiPatchCustomer } = useCustomersApi()
const { computeOrders, computePayments, formatCurrency, formatDate } = useUtilities()

const route = useRoute()
const id = route.params.id;
const enableEdit = ref(false);

try {
  await reloadCustomerDetails(id.toString())
} catch (error) {
  console.log(error)
}

let customerEdit = reactive<Customer>({
  first_name: customerDetails.value.first_name,
  last_name: customerDetails.value.last_name,
  clinic_name: customerDetails.value.clinic_name,
  area: customerDetails.value.area,
  discipline: customerDetails.value.discipline,
  contact: customerDetails.value.contact,
  email: customerDetails.value.email
})

const toggleEdit = () => {
  enableEdit.value = !enableEdit.value
}

const resetForm = () => {
  customerEdit.first_name = customerDetails.value.first_name
  customerEdit.last_name = customerDetails.value.last_name
  customerEdit.clinic_name = customerDetails.value.clinic_name
  customerEdit.contact = customerDetails.value.contact
  customerEdit.discipline = customerDetails.value.discipline
  customerEdit.area = customerDetails.value.area
  customerEdit.email = customerDetails.value.email
}

const compareForm = () => {
  if (
    customerEdit.first_name === customerDetails.value.first_name &&
    customerEdit.last_name === customerDetails.value.last_name &&
    customerEdit.clinic_name === customerDetails.value.clinic_name &&
    customerEdit.contact === customerDetails.value.contact &&
    customerEdit.discipline === customerDetails.value.discipline &&
    customerEdit.area === customerDetails.value.area &&
    customerEdit.email === customerDetails.value.email
  ) {
    return true
  }
  return false
}

const handleSubmit = async () => {
  if (!compareForm()) {
    await apiPatchCustomer(customerEdit, customerDetails.value.id)
  }
  toggleEdit()
}

</script>

<template>
  <div>
    <div class="mb-5 p-5 bg-white p-3 shadow-sm rounded-sm">
      <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
        <span clas="text-green-500">
          <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </span>
        <span class="tracking-wide">Customer ID# {{ customerDetails.id }}</span>
        <button class="text-base flex items-center justify-center leading-none w-4" @click="toggleEdit">
          <img src="https://cdn-icons-png.flaticon.com/512/2623/2623081.png" alt="location">
        </button>
      </div>
      <div class="text-gray-700">
        <div class="grid md:grid-cols-2 text-sm">
          <div class="mt-2 grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">First Name</div>
            <input :disabled="!enableEdit" v-model="customerEdit.first_name" type="text" class="
                      block
                      w-full
                      rounded-md
                      border border-gray-300
                      bg-white
                      text-gray-700
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                    " />
          </div>
          <div class="mt-2 grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Last Name</div>
            <input :disabled="!enableEdit" v-model="customerEdit.last_name" type="text" class="
                      block
                      w-full
                      rounded-md
                      border border-gray-300
                      bg-white
                      text-gray-700
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                      sm:text-sm
                    " />
          </div>
          <div class="mt-2 grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Clinic Name</div>
            <input :disabled="!enableEdit" v-model="customerEdit.clinic_name" type="text" class="
                      block
                      w-full
                      rounded-md
                      border border-gray-300
                      bg-white
                      text-gray-700
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                    " />
          </div>
          <div class="mt-2 grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Contact No.</div>
            <input :disabled="!enableEdit" v-model="customerEdit.contact" type="text" class="
                      block
                      w-full
                      rounded-md
                      border border-gray-300
                      bg-white
                      text-gray-700
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                        " />
          </div>
          <div class="mt-2 grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Area</div>
            <input :disabled="!enableEdit" v-model="customerEdit.area" type="text" class="
                      block
                      w-full
                      rounded-md
                      border border-gray-300
                      bg-white
                      text-gray-700
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                        " />
          </div>
          <div class="mt-2 grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Discipline/Field</div>
            <input :disabled="!enableEdit" v-model="customerEdit.discipline" type="text" class="
                      block
                      w-full
                      rounded-md
                      border border-gray-300
                      bg-white
                      text-gray-700
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                        " />
          </div>
          <div class="mt-2 grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Email.</div>
            <input :disabled="!enableEdit" v-model="customerEdit.email" type="text" class="
                          block
                          w-full
            rounded-md
                      border border-gray-300
                      bg-white
                      text-gray-700
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                        " />
          </div>
          <div class="mt-2 grid grid-cols-2">
            <div class="px-4 py-2 font-semibold">Current Balance</div>
            <input :disabled="true"
              :value="formatCurrency(computeOrders(customerDetails.transaction) - computePayments(customerDetails.transaction))"
              type="text" class="
                          block
                          w-full
                          bg-white
                          text-gray-700
                          py-2
                          px-4
                          shadow-sm
                          sm:text-sm
                        " />
          </div>
        </div>

        <div v-if="enableEdit" class="mt-4 px-4 py-3 text-right sm:px-6">
          <button type="button" @click="() => {
            toggleEdit() 
            resetForm()
          }" class="
                  inline-flex
                  mr-4
                  rounded-md
                  border border-transparent
                  bg-red-600
                  py-2
                  px-4
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  hover:bg-red-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                  ease-in-out
                  duration-100
                ">
            Cancel
          </button>
          <button @click="handleSubmit" type="button" class="
                  inline-flex
                  rounded-md
                  border border-transparent
                  bg-indigo-600
                  py-2
                  px-4
                  text-sm
                  font-medium
                  text-white
                  shadow-sm
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500
                  focus:ring-offset-2
                  ease-in-out
                  duration-100
                ">
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Experience and education -->
    <div class="mt-1 p-5 bg-white p-3 shadow-sm rounded-sm">
      <div class="grid grid-cols-2">
        <div>
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <span clas="text-green-500">
              <img class="h-5" src="https://cdn-icons-png.flaticon.com/512/1008/1008014.png" />
            </span>
            <span class="tracking-wide">Order Items</span>
          </div>
          <ul class="list-inside space-y-2">
            <div v-for="transactionItem in customerDetails.transaction" :key="transactionItem.id">
              <li v-if="transactionItem.transaction_type === 'ORDER'">
                <div class="text-teal-600">Transaction ID# {{ transactionItem.id }}</div>
                <div class="text-gray-500 text-xs">Total: {{ transactionItem.total_amount }}</div>
                <div class="text-gray-500 text-xs">Date: {{ formatDate(transactionItem.transaction_date) }}</div>
              </li>
            </div>

          </ul>
        </div>
        <div>
          <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
            <span clas="text-green-500">
              <img class="h-5" src="https://cdn-icons-png.flaticon.com/512/482/482541.png" />
            </span>
            <span class="tracking-wide">Payments Made</span>
          </div>
          <ul class="list-inside space-y-2">
            <div v-for="transactionItem in customerDetails.transaction" :key="transactionItem.id">
              <li v-if="transactionItem.transaction_type === 'PAYMENT'">
                <div class="text-teal-600">Transaction ID# {{ transactionItem.id }}</div>
                <div class="text-gray-500 text-xs">Amount: {{ transactionItem.total_amount }}</div>
                <div class="text-gray-500 text-xs">Date: {{ formatDate(transactionItem.transaction_date) }}</div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>