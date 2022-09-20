<script setup lang="ts">
import useProductsApi from '~~/composables/products/useProductsApi';
import useSupabaseStorage from '~~/composables/supabase/useSupabaseStorage';

const { apiPostProduct, apiGetManufacturers, reloadProductData } = useProductsApi()
const { saveImage, getImageUrl } = useSupabaseStorage()

const createProductModal = useState('modal', () => false)
const toggleModal = () => createProductModal.value = !createProductModal.value
const manufacturers = await apiGetManufacturers()

const productInput = reactive<Product>({
  manufacturer_id: "",
  product_name: "",
  price: null,
  type: "",
  category: "",
  dosage: null,
  image_url: "",
})

const imageToUpload = ref<File>()

const handleSubmit = async () => {
  const uploadImage = await saveImage(productInput.product_name, imageToUpload.value)
  productInput.image_url = (await getImageUrl(uploadImage.Key.replace('icon/', ''))).publicURL

  if (productInput.image_url) {
    await apiPostProduct(productInput)
    await reloadProductData()
    toggleModal()
  }
}

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  imageToUpload.value = target.files[0]
}

const clearFile = () => {
  imageToUpload.value = null
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
      <div v-show="createProductModal" class="z-10 fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
      </div>
    </transition>

    <div :class="createProductModal ? null : 'hidden'" class="fixed inset-0 z-10 overflow-y-auto">
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
                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Name</label>
                  <input v-model="productInput.product_name" type="text" class="
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
                    " placeholder="product name" />
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Price</label>
                  <input v-model="productInput.price" type="number" min="0" placeholder="0.0" class="
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
                  <label class="block text-sm font-medium text-gray-700">Dosage (mg)</label>
                  <input v-model="productInput.dosage" type="number" min="0" class="
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


                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Manufacturer</label>
                  <select v-model="productInput.manufacturer_id"
                    :class="!!productInput.manufacturer_id ? 'text-gray-700' : 'text-gray-400' " class="
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
                    <option value="" selected disabled>select product manufacturer</option>
                    <option v-for="manufacturer in manufacturers" :key="manufacturer.id" v-bind:value="manufacturer.id">
                      {{ manufacturer.name }}</option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Category</label>
                  <select v-model="productInput.category"
                    :class="!!productInput.category ? 'text-gray-700' : 'text-gray-400'" class="
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
                    <option value="" selected disabled>select product category</option>
                    <option value="Analgesics">Analgesics</option>
                    <option value="Antibacterial">Antibacterial</option>
                    <option value="Antihistamine">Antihistamine</option>
                    <option value="Anti-inflammatory">Anti-inflammatory</option>
                    <option value="Antiviral">Antiviral</option>
                    <option value="Bronchodilators">Bronchodilators</option>
                    <option value="Cough Suppressants">Cough Suppressants</option>
                    <option value="Food Supplemment">Food Supplemment</option>
                    <option value="Dietary Supplemment">Dietary Supplemment</option>
                  </select>
                </div>

                <div class="col-span-6 sm:col-span-3">
                  <label class="block text-sm font-medium text-gray-700">Type</label>
                  <select v-model="productInput.type" :class="!!productInput.type ? 'text-gray-700' : 'text-gray-400'"
                    class="
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
                    <option value="" selected disabled>select product type</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Ointment">Ointment</option>
                    <option value="Ointment">Inhalers</option>
                    <option value="Vial">Vial</option>
                  </select>
                </div>
                <div class="col-span-6">
                  <label class="block text-sm font-medium text-gray-700">Product Image</label>
                  <div class="
                      mt-1
                      flex
                      justify-center
                      rounded-md
                      border-2 border-dashed border-gray-300
                      px-6
                      pt-5
                      pb-6
                    ">
                    <div class="p-2 bg-gray-200 rounded-md flex" v-if="!!imageToUpload?.name">
                      <h3 class="text-gray-700">
                        {{imageToUpload.name}}
                      </h3>
                      <p class="ml-3 mr-1 cursor-pointer text-gray-700" @click="clearFile">x</p>

                    </div>
                    <div v-else>
                      <div class="space-y-1 text-center">
                        <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none"
                          viewBox="0 0 48 48" aria-hidden="true">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div class="text-center text-sm text-gray-600">
                          <label class="
                          text-center
                            relative
                            cursor-pointer
                            rounded-md
                            bg-white
                            font-medium
                            text-indigo-600
                            focus-within:outline-none
                            focus-within:ring-2
                            focus-within:ring-indigo-500
                            focus-within:ring-offset-2
                            hover:text-indigo-500
                          ">
                            <span>Upload a file</span>
                            <input type="file" class="sr-only" @change="handleFileInput" />
                          </label>

                        </div>
                        <p class="text-xs text-gray-500">
                          PNG, JPG, GIF up to 2MB
                        </p>
                      </div>
                    </div>
                  </div>
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