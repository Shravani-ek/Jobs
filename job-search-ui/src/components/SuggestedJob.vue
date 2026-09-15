<script setup lang="ts">
import { MapPin, Clock3, Bookmark } from "lucide-vue-next";

defineProps<{
  job: {
    company: string;
    title: string;
    location: string;
    posted: string;
    logo: string;
  };
}>();
</script>

<template>
  <div
    class="ui-card ui-card--compact transition duration-300"
  >
    <div class="flex justify-between items-start">

      <div class="flex gap-3">

        <div
          class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-xl"
        >
          {{ job.logo }}
        </div>

        <div>
          <h3 class="ui-card-title">
            {{ job.company }}
          </h3>

          <p class="ui-body mt-1 text-gray-700">
            {{ job.title }}
          </p>
        </div>

      </div>

      <Bookmark
        class="h-5 w-5 cursor-pointer text-gray-400 transition hover:text-brand-primary"
      />

    </div>

    <div class="flex gap-4 mt-4 text-sm">

      <div class="flex items-center gap-1 text-green-600">
        <MapPin class="w-4 h-4" />
        {{ job.location }}
      </div>

      <div class="flex items-center gap-1 text-orange-500">
        <Clock3 class="w-4 h-4" />
        {{ job.posted }}
      </div>

    </div>

    <button
      class="btn-primary mt-5 w-full rounded-xl py-2.5"
    >
      Quick Apply
    </button>
  </div>
</template>