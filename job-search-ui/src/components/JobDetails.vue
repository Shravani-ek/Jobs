<script setup lang="ts">
import { computed, ref } from "vue";

import {
  Building2,
  MapPin,
  BriefcaseBusiness,
  IndianRupee,
  Clock3,
  ClipboardList,
  Sparkles,
  CheckCircle2,
  Send,
} from "lucide-vue-next";

import type { Job } from "../types/job";

const props = defineProps<{
  job: Job;
  isAppliedJob?: boolean;
}>();

const emit = defineEmits<{
  (e: "close"): void;
  (e: "apply", job: Job): void;
}>();

/* ---------------------------------
   JOB DATA
---------------------------------- */

const isApplied = computed(() => props.isAppliedJob ?? false);

const isInternship = computed(() =>
  props.job.type?.toLowerCase().includes("internship")
);

const detailDescription = computed(() =>
  isInternship.value
    ? props.job.internshipDescription || props.job.description
    : props.job.description
);

/* ---------------------------------
   APPLY / RESUME
---------------------------------- */

const showResumeStep = ref(false);
const isChangingResume = ref(false);

const selectedResume = ref("My Resume.pdf");

const resumeOptions = [
  "My Resume.pdf",
  "Frontend Developer Resume.pdf",
  "Product Designer Resume.pdf",
];

function handleApply() {
  if (isApplied.value) return;

  showResumeStep.value = true;
  isChangingResume.value = false;
}

function confirmApply() {
  emit("apply", props.job);
  showResumeStep.value = false;
}
</script>

<template>
  <!-- MAIN DETAILS AREA -->
  <div
    class="h-full min-h-0 overflow-hidden px-3 pb-3 hide-scrollbar"
  >
    <!-- =====================================================
         MAIN WHITE CONTAINER
    ====================================================== -->

    <div
      class="flex h-full w-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
    >
      <!-- =====================================================
           TOP HEADER
      ====================================================== -->

      <div
        class="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur-sm"
      >
        <!-- LEFT -->
        <div class="flex min-w-0 items-center gap-3">
          <!-- COMPANY ICON -->
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white"
          >
            <Building2 class="h-6 w-6" />
          </div>

          <!-- COMPANY DETAILS -->
          <div class="min-w-0">
            <h1
              class="truncate text-lg font-bold text-slate-900"
            >
              {{ job.company }}
            </h1>

            <p
              class="mt-0.5 truncate text-xs text-slate-500"
            >
              Innovating the future with modern technology.
            </p>

            <div
              class="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-slate-500"
            >
              <span class="flex items-center gap-1">
                <MapPin
                  class="h-3.5 w-3.5 text-slate-500"
                />
                {{ job.location }}
              </span>

              <span>•</span>

              <span
                class="rounded-full bg-emerald-50 px-2.5 py-1 font-semibold text-emerald-600"
              >
                On-site
              </span>
            </div>
          </div>
        </div>

        <!-- ACTIONS -->
        <div class="flex shrink-0 items-center gap-2">
          <!-- SAVE -->
          <button
            class="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-4-7 4V5z"
              />
            </svg>

            Save
          </button>

          <!-- APPLY -->
          <button
            @click="handleApply"
            :class="
              isApplied
                ? 'bg-emerald-600 hover:bg-emerald-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
            "
            class="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-white shadow-sm transition"
          >
            <Send class="h-3.5 w-3.5" />

            {{ isApplied ? "Applied" : "Apply Now" }}
          </button>
        </div>
      </div>

      <!-- =====================================================
           CONTENT AREA
      ====================================================== -->

      <div
        class="min-h-0 flex-1 overflow-y-auto px-5 py-5 scrollbar-none"
      >
        <div
          class="grid min-w-0 grid-cols-[minmax(0,1fr)_210px] gap-4"
        >
          <!-- =================================================
               MAIN CONTENT
          ================================================== -->

        <div class="min-w-0">
          <!-- ABOUT -->
          <section
            class="rounded-lg bg-slate-50 px-4 py-3"
          >
            <div class="flex items-center gap-2">
              <ClipboardList
                class="h-4 w-4 text-indigo-600"
              />

              <h2
                class="text-sm font-semibold text-slate-900"
              >
                About this role
              </h2>
            </div>

            <p
              class="mt-2 max-w-3xl text-xs leading-5 text-slate-600"
            >
              {{ detailDescription }}
            </p>
          </section>


          <!-- =================================================
               SKILLS
          ================================================== -->

          <section
            v-if="job.skills?.length"
            class="mt-5"
          >
            <div class="flex items-center gap-2">
              <Sparkles
                class="h-4 w-4 text-indigo-600"
              />

              <h2
                class="text-sm font-semibold text-slate-900"
              >
                Skills required
              </h2>
            </div>

            <div
              class="mt-2 flex flex-wrap gap-1.5"
            >
              <span
                v-for="skill in job.skills"
                :key="skill"
                class="rounded-full bg-indigo-50 px-2.5 py-1 text-[11px] font-medium text-indigo-700"
              >
                {{ skill }}
              </span>
            </div>
          </section>

          <!-- =================================================
               JOB DESCRIPTION
          ================================================== -->

          <section class="mt-5">
            <div class="flex items-center gap-2">
              <ClipboardList
                class="h-4 w-4 text-indigo-600"
              />

              <h2
                class="text-sm font-semibold text-slate-900"
              >
                {{ isInternship ? "Internship Description" : "Job Description" }}
              </h2>
            </div>

            <p
              class="mt-2 text-xs leading-5 text-slate-600"
            >
              {{ detailDescription }}
            </p>

            <div v-if="job.responsibilities?.length" class="mt-4">
              <h3 class="text-sm font-semibold text-slate-900">
                Key Responsibilities
              </h3>

              <ul class="mt-2 space-y-1.5 text-xs text-slate-600">
                <li
                  v-for="responsibility in job.responsibilities"
                  :key="responsibility"
                  class="flex items-start gap-2"
                >
                  <span
                    class="mt-1 text-indigo-600"
                  >
                    •
                  </span>

                  <span>
                    {{ responsibility }}
                  </span>
                </li>
              </ul>
            </div>

            <div
              class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-slate-700"
            >
              <h3 class="text-sm font-semibold text-slate-900">
                Report this job
              </h3>

              <p class="mt-2 text-xs leading-5 text-slate-600">
                If you believe this job posting is suspicious or offensive.
              </p>

              <button
                class="mt-4 rounded-full border border-red-200 bg-white px-3 py-1 text-sm font-semibold text-red-700 transition hover:bg-red-50"
              >
                Report Job
              </button>
            </div>
          </section>
        </div>

        <!-- =================================================
             RIGHT SIDEBAR
        ================================================== -->

        <aside class="min-w-0 space-y-3">
          <!-- SMALL STATS -->
          <div
            class="grid grid-cols-2 overflow-hidden rounded-lg bg-violet-50"
          >
            <div
              class="border-b border-r border-white p-3"
            >
              <BriefcaseBusiness
                class="h-3.5 w-3.5 text-indigo-600"
              />

              <p
                class="mt-1 text-[10px] text-slate-400"
              >
                Job Type
              </p>

              <p
                class="mt-0.5 text-[11px] font-semibold text-slate-800"
              >
                {{ isInternship ? "Internship" : "Full Time" }}
              </p>
            </div>

            <div
              class="border-b border-white p-3"
            >
              <IndianRupee
                class="h-3.5 w-3.5 text-indigo-600"
              />

              <p
                class="mt-1 text-[10px] text-slate-400"
              >
                Pay
              </p>

              <p
                class="mt-0.5 text-[11px] font-semibold text-slate-800"
              >
                {{ job.salary || "N/A" }}
              </p>
            </div>

            <div
              class="border-r border-white p-3"
            >
              <Clock3
                class="h-3.5 w-3.5 text-indigo-600"
              />

              <p
                class="mt-1 text-[10px] text-slate-400"
              >
                Experience
              </p>

              <p
                class="mt-0.5 text-[11px] font-semibold text-slate-800"
              >
                {{ job.experience || "N/A" }}
              </p>
            </div>

            <div
              class="p-3"
            >
              <MapPin
                class="h-3.5 w-3.5 text-indigo-600"
              />

              <p
                class="mt-1 text-[10px] text-slate-400"
              >
                Location
              </p>

              <p
                class="mt-0.5 truncate text-[11px] font-semibold text-slate-800"
              >
                {{ job.location }}
              </p>
            </div>
          </div>

          <!-- =================================================
               ABOUT COMPANY
          ================================================== -->

          <div
            class="rounded-lg border border-emerald-100 bg-emerald-50/60 p-3"
          >
            <div class="flex items-center gap-2">
              <Building2
                class="h-4 w-4 text-emerald-600"
              />

              <h3
                class="text-xs font-semibold text-slate-900"
              >
                About Company
              </h3>
            </div>

            <p
              class="mt-2 text-[11px] leading-4 text-slate-600"
            >
              {{ job.company }} is innovating the future
              with modern technology.
            </p>

            <button
              class="mt-2 text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
            >
              View Profile →
            </button>
          </div>

          <!-- =================================================
               WHY JOIN US
          ================================================== -->

          <div
            class="rounded-lg border border-amber-100 bg-amber-50/60 p-3"
          >
            <div class="flex items-center gap-2">
              <Sparkles
                class="h-4 w-4 text-amber-600"
              />

              <h3
                class="text-xs font-semibold text-slate-900"
              >
                Why join us?
              </h3>
            </div>

            <ul
              class="mt-2 space-y-1.5 text-[11px] text-slate-700"
            >
              <li class="flex items-center gap-1.5">
                <CheckCircle2
                  class="h-3.5 w-3.5 text-emerald-500"
                />
                Competitive salary
              </li>

              <li class="flex items-center gap-1.5">
                <CheckCircle2
                  class="h-3.5 w-3.5 text-emerald-500"
                />
                Health insurance
              </li>

              <li class="flex items-center gap-1.5">
                <CheckCircle2
                  class="h-3.5 w-3.5 text-emerald-500"
                />
                Career growth
              </li>
            </ul>
          </div>

        </aside>
        </div>
      </div>
    </div>
  </div>

  <!-- =====================================================
       RESUME MODAL
  ====================================================== -->

  <div
    v-if="showResumeStep"
    class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4"
  >
    <div
      class="w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-2xl"
    >
      <!-- HEADER -->
      <div
        class="flex items-start justify-between gap-3"
      >
        <div>
          <p
            class="text-lg font-semibold text-slate-900"
          >
            Resume to submit
          </p>

          <p
            class="mt-1 text-sm text-slate-500"
          >
            Choose the resume you want to use for this
            application.
          </p>
        </div>
      </div>

      <!-- RESUME -->
      <div
        class="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3"
      >
        <div
          class="flex items-center justify-between gap-3"
        >
          <div>
            <p
              class="text-sm font-semibold text-slate-800"
            >
              {{ selectedResume }}
            </p>

            <p
              class="text-xs text-slate-500"
            >
              PDF • Last updated 2 days ago
            </p>
          </div>

          <button
            @click="isChangingResume = !isChangingResume"
            class="text-sm font-semibold text-indigo-600"
          >
            {{ isChangingResume ? "Hide" : "Change Resume" }}
          </button>
        </div>

        <!-- CHANGE RESUME -->
        <div
          v-if="isChangingResume"
          class="mt-3"
        >
          <label
            for="resume-select"
            class="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Select resume
          </label>

          <select
            id="resume-select"
            v-model="selectedResume"
            class="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-indigo-500"
          >
            <option
              v-for="resume in resumeOptions"
              :key="resume"
              :value="resume"
            >
              {{ resume }}
            </option>
          </select>
        </div>
      </div>

      <!-- ACTIONS -->
      <div
        class="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end"
      >
        <button
          @click="showResumeStep = false"
          class="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          @click="confirmApply"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          <CheckCircle2 class="h-4 w-4" />
          Apply Now
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hide-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.hide-scrollbar::-webkit-scrollbar,
.scrollbar-none::-webkit-scrollbar {
  display: none;
}

.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
</style>