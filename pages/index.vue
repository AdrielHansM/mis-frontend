<script setup lang="ts">

definePageMeta({
  middleware: "auth",
})

</script>

<template>
  <div class="container">
    <section class="text-gray-600 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex flex-col text-center w-full mb-20">
          <h1 class="
              sm:text-3xl
              text-2xl
              font-medium
              title-font
              mb-4
              text-gray-200
            ">
            Vanonant Medicine Inventory System
          </h1>
          <p class="lg:w-2/3 mx-auto leading-relaxed text-gray-300">
            A family business that started in 2006, which mainly caters to the
            distribution of medicine with high efficacy rating compared to
            generic brand. The business is still doing its process manually, and
            this is the first iteration of implementing a form of automation to
            its current business process.
          </p>
        </div>
        <div class="flex flex-wrap -m-4 text-center">
          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img class="mx-auto w-15 h-15" src="https://cdn-icons-png.flaticon.com/512/1751/1751805.png" alt="" />
              <h2 class="title-font font-medium text-3xl text-white">0</h2>
              <p class="leading-relaxed text-gray-400">Transactions</p>
            </div>
          </div>
          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img class="mx-auto w-15 h-15" src="https://cdn-icons-png.flaticon.com/512/3239/3239147.png" alt="" />
              <h2 class="title-font font-medium text-3xl text-white">0</h2>
              <p class="leading-relaxed text-gray-400">Customers</p>
            </div>
          </div>
          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img class="mx-auto w-15 h-15" src="https://cdn-icons-png.flaticon.com/512/1474/1474713.png" alt="" />
              <h2 class="title-font font-medium text-3xl text-white">0</h2>
              <p class="leading-relaxed text-gray-400">Products</p>
            </div>
          </div>
          <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
            <div class="border-2 border-gray-200 px-4 py-6 rounded-lg">
              <img class="mx-auto w-15 h-15" src="https://cdn-icons-png.flaticon.com/512/854/854929.png" alt="" />
              <h2 class="title-font font-medium text-3xl text-white">0</h2>
              <p class="leading-relaxed text-gray-400">Areas</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.container {
  max-width: 80%;
  margin: 0 auto;
  padding: 3rem 0;
  height: 90vh;
}
</style>