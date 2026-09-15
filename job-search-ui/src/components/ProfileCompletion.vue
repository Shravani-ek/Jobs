<script setup lang="ts">
import {
  UserCircle,
  Image,
  SquarePen,
  AlertTriangle,
} from "lucide-vue-next";
</script>

<template>
  <div
    class="ui-card mt-0 overflow-hidden"
  >
    <!-- Profile -->

    <div class="px-2 pt-1 pb-3 rounded-lg text-center">

      <div
        class="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-4 border-brand-surface bg-brand-dark text-3xl font-bold text-white shadow-md"
      >
        S
      </div>

      <h2 class="ui-card-title mt-2">
        Shravani-Ekre
      </h2>

      <p class="text-xs text-gray-700">
        @Shravani-Ekre
      </p>

      <!-- Progress -->

      <div class="mt-3">
        <div class="flex items-center gap-2">
          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              class="h-2 rounded-full bg-gradient-to-r from-[#5B21B6] via-[#7C3AED] to-[#A78BFA]"
              style="width:78%"
            ></div>
          </div>

          <span class="whitespace-nowrap text-sm font-bold text-brand-primary">
            78%
          </span>
        </div>
      </div>

    </div>

    <div class="border-t border-gray-200">

      <!-- Item -->

      <div
        class="flex justify-between items-center px-4 py-2.5 hover:bg-gray-50"
      >
        <div class="flex items-center gap-3">

          <UserCircle
            class="text-green-500"
            :size="18"
          />

          <span class="text-sm font-medium text-gray-700">
            Add competitive exam
          </span>

        </div>

        <span
          class="bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full text-xs font-semibold"
        >
          +6%
        </span>

      </div>

      <!-- Item -->

      <div
        class="flex justify-between items-center px-4 py-2.5 border-t border-gray-200 hover:bg-gray-50"
      >
        <div class="flex items-center gap-3">

          <Image
            class="text-orange-500"
            :size="18"
          />

          <span class="text-sm font-medium text-gray-700">
            Upload photo
          </span>

        </div>

        <span
          class="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold"
        >
          +2%
        </span>

      </div>

      <!-- Item -->

      <div
        class="flex justify-between items-center px-4 py-2.5 border-t border-gray-200 hover:bg-gray-50"
      >
        <div class="flex items-center gap-3">

          <SquarePen
            class="text-purple-500"
            :size="18"
          />

          <span class="text-sm font-medium text-gray-700">
            Add 2 missing details
          </span>

        </div>

        <span
          class="bg-yellow-100 text-yellow-700 p-1 rounded-full"
        >
          <AlertTriangle :size="14" />
        </span>

      </div>

    </div>

    <!-- Button -->

    <div class="p-4">

      <button
        class="btn-primary w-full py-2"
      >
        View and Update Profile
      </button>

    </div>

  </div>
</template>