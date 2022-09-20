<script setup lang="ts">
import useProductsApi from '~~/composables/products/useProductsApi';
import useUtilities from '~~/composables/utilities/useUtilities';


const { productData, reloadProductData } = useProductsApi()
const { formatCurrency } = useUtilities()
reloadProductData()
</script>

<template>
  <div class="
      grid grid-cols-1
 gap-x-6
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4 xl:gap-x-8
    ">
    <a v-for="product in productData" @click="() => {navigateTo(`/products/${product.id}`)}" :class="'cursor-pointer'"
      :key="product.id" class="group">
      <div class="
          aspect-w-1 aspect-h-1
          w-full
          overflow-hidden
          rounded-lg
          bg-gray-200
          xl:aspect-w-7 xl:aspect-h-8
        ">
        <img :src="product.image_url" :alt="product.product_name" class="w-full h-48 object-cover group-hover:opacity-75 ease-in-out
        duration-100" />
      </div>
      <h3 class="mt-3 text-sm text-gray-400">{{ product.product_name }}</h3>
      <p class="mb-4 text-lg font-medium text-gray-200">
        {{ formatCurrency(product.price) }}
      </p>
    </a>
  </div>
</template>