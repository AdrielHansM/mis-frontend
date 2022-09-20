<script setup lang="ts">
import useInventoryApi from '~~/composables/products/useInventoryApi';
import useProductsApi from '~~/composables/products/useProductsApi';

const { apiGetProducts } = useProductsApi()
const { apiPostInventory, reloadInventoryData } = useInventoryApi()

const products = await apiGetProducts()

const inventoryInput = reactive<Inventory>({
  product_id: "",
  quantity: null,
  expiry_date: new Date,
})

const createInventoryModal = useState('modal', () => false)
const toggleModal = () => createInventoryModal.value = !createInventoryModal.value

const handleSubmit = async () => {
  inventoryInput.expiry_date = new Date(inventoryInput.expiry_date)
  await apiPostInventory(inventoryInput)
  await reloadInventoryData()
  toggleModal()
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
      <div v-show="createInventoryModal" class="z-10 fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
      </div>
    </transition>

    <div :class="createInventoryModal ? null : 'hidden'" class="fixed inset-0 z-10 overflow-y-auto">
      <div class="
          flex
          min-h-full
          items-end
          justify-center
          p-4
          text-center
          sm:items-center sm:p-0
        ">
        <form>
          <div class="text-left overflow-hidden shadow sm:rounded-md">
            <div class="bg-white px-4 py-5 sm:p-6">
              <div class="grid grid-cols-6 gap-6">

                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Products</label>
                  <select v-model="inventoryInput.product_id"
                    :class="!!inventoryInput.product_id ? 'text-gray-700' : 'text-gray-400' " class="
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
                    <option value="" selected disabled>Select prodcuts...</option>
                    <option v-for="product in products" :key="product.id" v-bind:value="product.id">
                      {{ product.product_name }}
                    </option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Quantity</label>
                  <input type="number" v-model="inventoryInput.quantity" min=0 class="
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
                    " placeholder="enter quantity..." />
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Expiration Date
                  </label>
                  <input type="date" v-model="inventoryInput.expiry_date" min=0 class="
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
                    " placeholder="enter quantity..." />
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

<style>
::-webkit-calendar-picker-indicator {
  filter: invert(1);
}
</style>