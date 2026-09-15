<script setup lang="ts">
import { UserPlus, MessageSquare } from "lucide-vue-next";

const people = [
  {
    name: "Rosy",
    avatar: "R",
    color: "bg-green-500",
  },
  {
    name: "Messaging...",
    avatar: "M",
    color: "bg-blue-500",
  },
  {
    name: "Goldy",
    avatar: "G",
    color: "bg-orange-500",
  },
];
</script>

<template>
  <div class="ui-card ui-card--compact">

    <h3 class="ui-section-header mb-3">
      People You May Know
    </h3>

    <div
      v-for="person in people"
      :key="person.name"
      class="flex items-center justify-between mb-3"
    >
      <div class="flex items-center gap-3">

        <div
          class="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
          :class="person.color"
        >
          {{ person.avatar }}
        </div>

        <div>
          <h3 class="text-sm font-semibold text-gray-900">
            {{ person.name }}
          </h3>

          <p class="text-xs text-gray-700">
            NxtTurn Member
          </p>
        </div>

      </div>

      <div class="flex gap-2">

        <button
          class="group relative flex h-8 w-8 items-center justify-center rounded-full border border-brand-primary text-brand-primary transition hover:bg-brand-surface"
          :title="'Connect'"
        >
          <UserPlus :size="18" />
          <span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded-sm opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            Connect
          </span>
        </button>

        <button
          class="group relative w-8 h-8 rounded-full border border-green-500 flex items-center justify-center text-green-600 hover:bg-green-50"
          :title="'Message'"
        >
          <MessageSquare :size="18" />
          <span class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-xs px-2 py-1 rounded-sm opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            Message
          </span>
        </button>

      </div>
    </div>

    <button
      class="btn-primary mt-2 w-full"
    >
      Show More Suggestions
    </button>

  </div>
</template>