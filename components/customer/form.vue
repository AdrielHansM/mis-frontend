<script setup lang="ts">
import useCustomersApi from '~~/composables/customers/useCustomersApi';
import useUtilities from '~~/composables/utilities/useUtilities';


const { apiPostCustomer, reloadCustomerData } = useCustomersApi()
const { formatPhoneNumber } = useUtilities()

let customerInput = reactive<Customer>({
  first_name: '',
  last_name: '',
  clinic_name: '',
  area: '',
  discipline: '',
  contact: '',
  email: ''
})

const createCustomerModal = useState('modal', () => false)
const toggleModal = () => {
  createCustomerModal.value = !createCustomerModal.value
  resetForm()
}


const handleSubmit = async () => {
  customerInput.contact = formatPhoneNumber(customerInput.contact)
  console.log(customerInput)
  await apiPostCustomer(customerInput)
  await reloadCustomerData()
  resetForm()
  toggleModal()
}

const resetForm = () => {
  customerInput.area = ''
  customerInput.clinic_name = ''
  customerInput.contact = ''
  customerInput.discipline = ''
  customerInput.email = ''
  customerInput.first_name = ''
  customerInput.last_name = ''
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
                  <label class="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" v-model="customerInput.first_name" class="
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
                    " placeholder="first name..." />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" v-model="customerInput.last_name" placeholder="last name..." class="
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
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Clinic Name</label>
                  <input type="text" v-model="customerInput.clinic_name" placeholder="clinic..." class="
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
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <input type="text" v-model="customerInput.email" placeholder="email..." class="
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
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Contact</label>
                  <div class="flex">
                    <span
                      class="mt-1 inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">+63</span>
                    <input type="text" v-model="customerInput.contact" maxlength="11" placeholder="09161766345" class="
                    mt-1
                    block
                    w-full
                    rounded-r-md
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
                </div>

                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Area</label>

                  <input type="text" v-model="customerInput.area" placeholder="Area or address line" class="
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
                </div>
                <div class="col-span-6 sm:col-span-4">
                  <label class="block text-sm font-medium text-gray-700">Discipline/Field of expertise</label>
                  <input type="text" v-model="customerInput.discipline" placeholder="area of expertise" class="
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