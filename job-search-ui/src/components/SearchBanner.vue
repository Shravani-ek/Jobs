<script setup lang="ts">
import { Search } from "lucide-vue-next";
</script>

<template>
  <div class="mb-4">
    <div class="bg-white rounded-full border border-gray-200 px-3 py-2 flex items-center shadow-sm">
      <Search class="ml-2 h-4 w-4 text-gray-400" />

      <input
        type="text"
        placeholder="Search Job"
        class="ui-body flex-1 bg-transparent px-4 py-1.5 text-gray-900 outline-none placeholder:text-gray-400"
      />

      <button
        class="btn-primary rounded-full px-4 py-2"
      >
        Search
      </button>
    </div>
  </div>
</template>