<script setup lang="ts">
import { computed } from "vue";
import type { Job } from "../types/job";
import {
  MapPin,
  Briefcase,
  BriefcaseBusiness,
  Bookmark,
  Share2,
  IndianRupee,
  Clock3,
} from "lucide-vue-next";

const emit = defineEmits<{
  (e: "viewDetails", job: Job): void;
  (e: "save", job: Job, isSaved: boolean): void;
}>();

const props = defineProps<{
  job: Job;
  saved?: boolean;
  variant?: "job" | "internship";
}>();

function toggleSave() {
  emit("save", props.job, !props.saved);
}

const accentGradientStyle = {
  color: "#2563eb",
};

const isInternship = computed(() => props.variant === "internship" || props.job.type.toLowerCase().includes("internship"));
const badgeText = computed(() => (isInternship.value ? "Internship" : props.job.type));
const helperText = computed(() =>
  isInternship.value
    ? "Great for students and early-career builders"
    : ""
);

const internshipDuration = computed(() => {
  const value = props.job.duration || props.job.experience || "";
  return value.trim() || "Duration not specified";
});

const internshipType = computed(() => {
  const value = props.job.internshipType || props.job.type || "";
  return value.trim() || "Type not specified";
});

const internshipMeta = computed(() => [
  { icon: MapPin, label: props.job.location || "Location TBD", color: "#F43F5E", bg: "bg-rose-50" },
  { icon: IndianRupee, label: props.job.salary || "Payment not specified", color: "#16A34A", bg: "bg-green-50" },
  { icon: Clock3, label: internshipDuration.value, color: "#F59E0B", bg: "bg-amber-50" },
  { icon: BriefcaseBusiness, label: internshipType.value, color: "#3B82F6", bg: "bg-blue-50" },
]);
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-2 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border border-brand-light transition-shadow duration-150"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="min-w-0 flex-1">
        <h2 class="text-sm font-semibold leading-5 text-grey-900">
          {{ job.title }}
        </h2>

        <p v-if="job.company" class="mt-0.5 text-xs text-gray-500">
          {{ job.company }}
        </p>

        <div v-if="isInternship" class="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-700">
          <div
            v-for="(item, index) in internshipMeta"
            :key="`${item.label}-${index}`"
            class="flex items-center gap-1.5"
          >
            <div :class="['flex h-6 w-6 items-center justify-center rounded-full', item.bg]">
              <component :is="item.icon" class="h-3.5 w-3.5" :style="{ color: item.color }" />
            </div>
            <span class="font-medium">{{ item.label }}</span>
          </div>
        </div>

        <div v-else class="mt-2 flex flex-wrap items-center gap-2 text-sm text-gray-700">
          <div class="flex items-center gap-1.5">
            <div class="flex h-6 w-6 items-center justify-center rounded-full bg-rose-50">
              <MapPin class="h-3.5 w-3.5" :style="{ color: '#F43F5E' }" />
            </div>
            <span>{{ job.location }}</span>
          </div>

          <span class="text-slate-300">•</span>

          <div class="flex items-center gap-1.5">
            <div class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-50">
              <Briefcase class="h-3.5 w-3.5" :style="{ color: '#3B82F6' }" />
            </div>
            <span>{{ job.experience || "Experience not specified" }}</span>
          </div>
        </div>

        <div v-if="job.skills?.length" class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="skill in job.skills.slice(0, 4)"
            :key="skill"
            class="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-gray-700"
          >
            {{ skill }}
          </span>
        </div>
      </div>

      <span class="shrink-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-950">
        {{ badgeText }}
      </span>
    </div>

    <div v-if="!isInternship" class="mt-2 text-sm text-gray-700">
      {{ helperText }}
    </div>

    <div class="mt-2 flex items-center justify-between gap-3">
      <button
        @click="$emit('viewDetails', job)"
        class="job-card-view-details inline-flex items-center gap-1"
      >
        <span>View Details</span>
        <span aria-hidden="true">→</span>
      </button>

      <div class="flex items-center gap-2">
        <button
          @click="toggleSave"
          class="rounded-md p-2 transition"
          :class="saved ? 'bg-brand-surface' : 'hover:bg-brand-surface'"
          aria-label="Save job"
        >
          <Bookmark class="h-3.5 w-3.5" :class="saved ? 'fill-current' : ''" :style="accentGradientStyle" />
        </button>

        <button
          class="rounded-md p-2 transition hover:bg-brand-surface"
          aria-label="Share job"
        >
          <Share2 class="h-3.5 w-3.5" :style="accentGradientStyle" />
        </button>
      </div>
    </div>
  </div>
</template>