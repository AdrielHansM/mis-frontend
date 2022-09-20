<script>
export default {
  data() {
    return {
      isOpen: false,
      profileOpen: false,
    };
  },
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    profileDrawer() {
      this.profileOpen = !this.profileOpen;
    },
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      },
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      if (e.key == 27 && this.isOpen) this.isOpen = false;
    });
  },
};
</script>

<script setup>
import useAuth from '~~/composables/supabase/useAuth';
import useApi from '~~/composables/accounts/useAccountsApi';
const { supabaseSignOut } = useAuth()
const { apiSignOut } = useApi()

const handleSignOut = async () => {
  apiSignOut()
  await supabaseSignOut()
}
</script>

<template>
  <nav class="
      flex
      w-full
      items-center
      justify-between
      px-6
      h-16
      bg-white
      text-gray-700
      border-b border-gray-200
      z-10
    ">
    <div class="flex items-center">
      <button class="mr-2" aria-label="Open Menu" @click="drawer">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          viewBox="0 0 24 24" class="w-8 h-8">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div class="flex items-center">
      <div class="hidden md:block md:flex md:justify-between md:bg-transparent">
        <button @click="profileDrawer" class="
            p-3
            font-medium
            mr-2
            text-center
            bg-gray-300
            rounded
            hover:bg-gray-400
          ">
          <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
            stroke="currentColor" class="w-6 h-6">
            <path
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
          </svg>
        </button>
      </div>
    </div>

    <transition enter-class="opacity-0" enter-active-class="ease-out transition-medium" enter-to-class="opacity-100"
      leave-class="opacity-100" leave-active-class="ease-out transition-medium" leave-to-class="opacity-0">
      <div @keydown.esc="isOpen = false" v-show="isOpen" class="z-10 fixed inset-0 transition-opacity">
        <div @click="isOpen = false" class="absolute inset-0 bg-black opacity-50" tabindex="0"></div>
      </div>
    </transition>

    <div class="
        transform
        top-15
        right-7
        w-44
        bg-white
        rounded
        divide-y divide-gray-100
        shadow
        dark:bg-gray-700
        fixed
        overflow-auto
        ease-in-out
        transition-all
        duration-300
        z-30
      " :class="profileOpen ? 'translate-x-0' : 'translate-x-60'">
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
        <li>
          <a class="
              block
              py-2
              px-4
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">Profile</a>
        </li>
        <li>
          <a @click="handleSignOut" class="
              block
              py-2
              px-4
              hover:bg-gray-100
              dark:hover:bg-gray-600 dark:hover:text-white
            ">Sign out</a>
        </li>
      </ul>
    </div>

    <aside class="
        transform
        top-0
        left-0
        w-64
        bg-white
        fixed
        h-full
        overflow-auto
        ease-in-out
        transition-all
        duration-300
        z-30
      " :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <span @click="isOpen = false" class="flex w-full items-center p-4 border-b -ml-6 cursor-pointer">
        <span>
          <img
            src="https://thumbs.dreamstime.com/b/delivery-truck-add-plus-icon-loading-shipment-item-medical-transportation-illustration-simple-outline-vector-symbol-design-126385503.jpg"
            alt="Logo" class="w-32 object-contain" />
        </span>
        <span class="-ml-4">
          <h3 class="text-2xl font-sans font-bold">Vanonant</h3>
        </span>
      </span>
      <span @click="
        () => {
          navigateTo('/');
          isOpen = false;
        }
      " class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"><span class="mr-2">
          <img class="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/2626/2626863.png" alt="" />
        </span>
        <span>Home</span></span>
      <span @click="
        () => {
          navigateTo('/products');
          isOpen = false;
        }
      " class="flex items-center p-4 hover:bg-indigo-500 hover:text-white">
        <span class="mr-2">
          <img class="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/2203/2203684.png" alt="" />
        </span>
        <span>Products</span>
      </span>
      <span @click="
        () => {
          navigateTo('/inventory');
          isOpen = false;
        }
      " class="flex items-center p-4 hover:bg-indigo-500 hover:text-white">
        <span class="mr-2">
          <img class="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/3114/3114481.png" alt="" />
        </span>
        <span>Inventory</span>
      </span>
      <span @click="
        () => {
          navigateTo('/customers');
          isOpen = false;
        }
      " class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"><span class="mr-2">
          <img class="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/7041/7041719.png" alt="" />
        </span>
        <span>Customers</span>
      </span>
      <span @click="
        () => {
          navigateTo('/transactions');
          isOpen = false;
        }
      " class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"><span class="mr-2">
          <img class="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/3675/3675162.png" alt="" />
        </span>
        <span>Transactions</span>
      </span>
      <span @click="
        () => {
          navigateTo('/accounts');
          isOpen = false;
        }
      " class="flex items-center p-4 hover:bg-indigo-500 hover:text-white"><span class="mr-2">
          <img class="w-6 h-6" src="https://cdn-icons-png.flaticon.com/512/2354/2354573.png" alt="" />
        </span>
        <span>Accounts</span>
      </span>
    </aside>
  </nav>
</template>
