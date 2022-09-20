<script setup lang="ts">
import useCustomersApi from '~~/composables/customers/useCustomersApi';
import useInventoryApi from '~~/composables/products/useInventoryApi';
import useTransactionsApi from '~~/composables/transactions/useTransactionsApi';
import useUtilities from '~~/composables/utilities/useUtilities';

const { reloadCustomerDetails, customerDetails } = useCustomersApi()
const { } = useTransactionsApi()
const { inventoryData, reloadInventoryData } = useInventoryApi()
const { apiPostTransaction } = useTransactionsApi()
const { formatPhoneNumber } = useUtilities()

const onSubmission = ref(false)
const route = useRoute()
const id = route.params.id;

try {
  await reloadCustomerDetails(id.toString())
  await reloadInventoryData()
} catch (error) {

}

let transactionInput = reactive<Transaction>({
  customer_id: customerDetails.value.id,
  transaction_type: '',
  total_amount: 0,
  transaction_date: null,
  order_item: [],
  payment: []
})

const orderItemInput = reactive<OrderItem>({
  inventory_id: null,
  item_amount: 0,
  item_quantity: null
})

const paymentInput = reactive<Payment>({
  payment_method: '',
  payment_amount: 0,
  payment_date: null
})

const createCustomerModal = useState('modal', () => false)
const toggleModal = () => {
  createCustomerModal.value = !createCustomerModal.value
  resetForm()
}

const handleSubmit = async () => {
  onSubmission.value = true
  if (transactionInput.transaction_type === "PAYMENT") {
    transactionInput.payment.push({
      payment_method: paymentInput.payment_method,
      payment_amount: paymentInput.payment_amount,
      payment_date: paymentInput.payment_date
    })
  }

  if (transactionInput.transaction_type === "ORDER" && transactionInput.order_item.length === 0) {
    return;
  }

  if (transactionInput.transaction_type === "PAYMENT" && transactionInput.order_item.length === 0) {
    return;
  }

  await apiPostTransaction(transactionInput)
  await reloadCustomerDetails(customerDetails.value.id.toString())
  resetForm()
  toggleModal()
  onSubmission.value = false
}

const resetForm = () => {
  clearTransaction()
  clearPayment()
  clearOrderItem()
}

const validateForm = () => {
  if (transactionInput.transaction_type === "ORDER") {
    clearPayment()
  }
  if (transactionInput.transaction_type === "PAYMENT") {
    transactionInput.order_item = []
    clearOrderItem()
  }
}

const clearTransaction = () => {
  transactionInput.transaction_type = ''
  transactionInput.total_amount = 0
  transactionInput.transaction_date = null
  transactionInput.order_item = []
  transactionInput.payment = []
}

const clearPayment = () => {
  paymentInput.payment_amount = 0
  paymentInput.payment_date = null
  paymentInput.payment_method = ''
}

const clearOrderItem = () => {
  orderItemInput.inventory_id = null
  orderItemInput.item_quantity = null
  orderItemInput.item_amount = 0
}

const removeItem = (id: number) => {
  const index = transactionInput.order_item.findIndex(item => item.inventory_id === id)
  transactionInput.total_amount -= transactionInput.order_item[index].item_amount
  transactionInput.order_item.splice(index, 1)
}

const processOrderItemQuantity = () => {
  const inventory = inventoryData.value.find(inventory => inventory.id === orderItemInput.inventory_id)

  if (inventory.quantity < orderItemInput.item_quantity) {
    alert("Quantity exceeds available inventory")
    orderItemInput.item_quantity = inventory.quantity
    return;
  }
  orderItemInput.item_amount = orderItemInput.item_quantity * inventory.product.price
}

const processTransactionOrderItem = () => {

  const index = transactionInput.order_item.findIndex(item => item.inventory_id === orderItemInput.inventory_id)
  if (index > - 1) {
    const modifyOrderItem = transactionInput.order_item.find(orderItem => orderItem.inventory_id === orderItemInput.inventory_id)
    modifyOrderItem.item_amount += orderItemInput.item_amount
    modifyOrderItem.item_quantity += orderItemInput.item_quantity
    transactionInput.total_amount += orderItemInput.item_amount
    transactionInput.order_item[index] = modifyOrderItem
    return;
  }

  transactionInput.total_amount += orderItemInput.item_amount
  transactionInput.order_item.push({
    inventory_id: orderItemInput.inventory_id,
    item_amount: orderItemInput.item_amount,
    item_quantity: orderItemInput.item_quantity
  })
}

const processTransactionPayment = () => {
  transactionInput.total_amount = paymentInput.payment_amount
}

const onChangeDate = (inputLocation: string) => {
  if (!!paymentInput.payment_date && inputLocation === "PAYMENT") {
    transactionInput.transaction_date = paymentInput.payment_date
  }

  if (!!transactionInput.transaction_date && transactionInput.transaction_type === "PAYMENT" && inputLocation === "TRANSACTION") {
    paymentInput.payment_date = transactionInput.transaction_date
  }
}

</script>
<template>
  <div>
    <button @click="toggleModal" class="fixed bottom-20 right-20">
      <img src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" alt="" class="w-full h-14 cursor-pointer object-cover hover:opacity-75 ease-in-out
        duration-100">
    </button>

    <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100"
      leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
      <div v-show="createCustomerModal" class="z-10 fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
      </div>
    </transition>

    <div :class="createCustomerModal ? null : 'hidden'" class="fixed inset-0 z-10 overflow-y-auto">
      <div class="
          flex
          min-h-full
          items-end
          justify-center
          p-4
          text-center
          sm:items-center sm:p-0
        ">
        <form id="createCustomerForm">
          <div class="text-left overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">
                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Customer ID#</label>
                  <input disabled type="text" v-model="transactionInput.customer_id" class="
                      mt-1
                      block
                      w-full
                      rounded-md
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

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Transaction Amount</label>
                  <input disabled type="text" v-model="transactionInput.total_amount" class="
                      mt-1
                      block
                      w-full
                      rounded-md
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

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Transaction Date</label>
                  <input type="date" v-model="transactionInput.transaction_date" @change="onChangeDate('TRANSACTION')"
                    class="
                      mt-1
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
                  <p :class="!transactionInput.transaction_date && onSubmission ? '' : 'hidden'"
                    class="ml-1 text-red-600 text-xs">This field is required</p>
                </div>

                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Transaction Type</label>
                  <select @change="validateForm" v-model="transactionInput.transaction_type"
                    :class="true ? 'text-gray-700' : 'text-gray-400'" class="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border border-gray-300
                      bg-white
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                    ">
                    <option value="" selected disabled>select type</option>
                    <option value="PAYMENT">Payment</option>
                    <option value="ORDER">Order</option>

                  </select>
                  <p :class="!transactionInput.transaction_type && onSubmission ? '' : 'hidden'"
                    class="ml-1 text-red-600 text-xs">A type of transaction is required</p>
                </div>


                <div v-if="!!transactionInput.transaction_type && transactionInput.transaction_type === 'ORDER'"
                  class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Inventory Items</label>
                  <select v-model="orderItemInput.inventory_id" :class="true ? 'text-gray-700' : 'text-gray-400'" class="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border border-gray-300
                    bg-white
                    py-2
                    px-3
                    shadow-sm
                    focus:border-indigo-500
                    focus:outline-none
                    focus:ring-indigo-500
                    sm:text-sm
                  ">
                    <option value="" selected disabled>select items</option>
                    <option v-for="inventoryItem in inventoryData" :key="inventoryItem.id"
                      v-bind:value="inventoryItem.id">
                      {{ `#${inventoryItem.id} ${inventoryItem.product.product_name}
                      ${inventoryItem.quantity} boxes` }}
                    </option>
                  </select>
                  <p :class="!orderItemInput.inventory_id && onSubmission ? '' : 'hidden'"
                    class="ml-1 text-red-600 text-xs">This field is required</p>
                </div>

                <div v-if="!!transactionInput.transaction_type && transactionInput.transaction_type === 'ORDER'"
                  class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Quantity</label>
                  <input type="number" min="0" v-model="orderItemInput.item_quantity" @change="processOrderItemQuantity"
                    class="
                      mt-1
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
                  <p :class="!orderItemInput.item_quantity && onSubmission ? '' : 'hidden'"
                    class="ml-1 text-red-600 text-xs">Order quantity is required</p>
                </div>

                <div v-if="!!transactionInput.transaction_type && transactionInput.transaction_type === 'ORDER'"
                  class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Amount</label>
                  <input disabled type="number" v-model="orderItemInput.item_amount" class="
                      mt-1
                      block
                      w-full
                      rounded-md
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
                  <button type="button" @click="() => {
                    processTransactionOrderItem()
                    clearOrderItem()
                  }" class="
                    rounded-md
                    border border-transparent
                    bg-indigo-600
                    mt-2
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
                    Add Item
                  </button>
                </div>

                <div v-if="!!transactionInput.transaction_type && transactionInput.transaction_type === 'ORDER'"
                  class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Transaction Items</label>
                  <div class="
                      mt-1
                      flex
                      rounded-md
                      border-2 border-dashed border-gray-300
                      px-6
                      pt-5
                      pb-6
                    ">

                    <ul v-if="transactionInput.order_item.length > 0" class="text-gray-800">
                      <li class="flex mt-2 p-3 rounded-md bg-gray-200"
                        v-for="transactionItem in transactionInput.order_item" :key="transactionItem.inventory_id">
                        <p>{{ `#${transactionItem.inventory_id} - Php${transactionItem.item_amount}` }}</p>
                        <p class="ml-3" @click="removeItem(transactionItem.inventory_id)">x</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div v-if="!!transactionInput.transaction_type && transactionInput.transaction_type === 'PAYMENT'"
                  class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select v-model="paymentInput.payment_method" :class="true ? 'text-gray-700' : 'text-gray-400'" class="
                      mt-1
                      block
                      w-full
                      rounded-md
                      border border-gray-300
                      bg-white
                      py-2
                      px-3
                      shadow-sm
                      focus:border-indigo-500
                      focus:outline-none
                      focus:ring-indigo-500
                      sm:text-sm
                    ">
                    <option value="" selected disabled>select payment method</option>
                    <option value="CASH">Cash</option>
                    <option value="CHEQUE">Cheque</option>
                  </select>
                  <p :class="!paymentInput.payment_method && onSubmission ? '' : 'hidden'"
                    class="ml-1 text-red-600 text-xs">Payment method required</p>
                </div>

                <div v-if="!!transactionInput.transaction_type && transactionInput.transaction_type === 'PAYMENT'"
                  class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Payment Amount</label>
                  <input type="number" min="0" @change="processTransactionPayment" v-model="paymentInput.payment_amount"
                    class="
                      mt-1
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
                  <p :class="paymentInput.payment_amount < 1 && onSubmission ? '' : 'hidden'"
                    class="ml-1 text-red-600 text-xs">An amount is required</p>
                </div>

                <div v-if="!!transactionInput.transaction_type && transactionInput.transaction_type === 'PAYMENT'"
                  class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Date of Payment</label>
                  <input type="date" @change="onChangeDate('PAYMENT')" v-model="paymentInput.payment_date" class="
                      mt-1
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
                  <p :class="!paymentInput.payment_date && onSubmission ? '' : 'hidden'"
                    class="ml-1 text-red-600 text-xs">Payment date is required</p>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <button type="button" @click="toggleModal" class="
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
        </form>
      </div>
    </div>
  </div>
</template>