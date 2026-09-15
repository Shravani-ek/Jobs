<script setup lang="ts">
import { ChevronDown, MapPin, SlidersHorizontal } from "lucide-vue-next";
import { ref } from "vue";

const props = defineProps<{ mode?: "job" | "internship" }>();

const salary = ref(300);
const openSections = ref<Record<string, boolean>>({
  salary: true,
  jobType: true,
  experience: true,
  location: true,
  department: false,
  companyType: false,
  roleCategory: false,
  education: false,
  postedBy: false,
  industry: false,
  freshness: false,
  applicants: false,
});

const jobTypes = [
  "Hybrid",
  "Remote",
  "Full-Time"
];

const experience = [
  { name: "Entry Level", jobs: 387 },
  { name: "Intermediate", jobs: 149 },
  { name: "Expert", jobs: 2986 },
];

const applicants = [
  { name: "Less than 10", jobs: 268 },
  { name: "10 to 50", jobs: 149 },
  { name: "50 to 100", jobs: 28 },
];

const departments = ["Engineering", "Design", "Marketing", "Sales"];
const companyTypes = ["Startup", "Enterprise", "Agency", "Remote First"];
const roleCategories = ["Developer", "Manager", "Analyst", "Designer"];
const educations = ["Bachelor", "Master", "PhD", "Diploma"];
const postedBy = ["Recruiter", "Company", "Agency"];
const industries = ["IT Services", "Fintech", "Healthcare", "E-commerce"];
const freshness = ["Any Time", "Last 24 Hours", "Last 7 Days", "Last 30 Days"];
</script>

<template>
  <aside class="ui-card ui-card--compact flex h-full min-h-0 w-full flex-col rounded-lg">

    <!-- Header -->
    <div class="mb-3 flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
      <div class="flex items-center gap-2">
        <div class="rounded-lg bg-brand-surface p-1.5 text-brand-primary">
          <SlidersHorizontal class="h-4 w-4" />
        </div>
        <h2 class="ui-section-header">
          Filter
        </h2>
      </div>

      <button
        class="text-sm font-medium text-grey-500 transition hover:underline"
      >
        Clear All
      </button>
    </div>

    <!-- Scrollable Content -->
    <div class="flex-1 overflow-y-auto pr-1 scrollbar-hide">
      <div class="rounded-lg bg-slate-50 p-2">
        <div class="space-y-2">
          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.salary = !openSections.salary"
            >
              <span class="font-semibold text-gray-900">Salary Range</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.salary ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.salary" class="mt-2 px-1">
              <div class="mb-2 flex items-center justify-between">
                <span class="text-xs text-gray-700">Range</span>
                <span class="rounded-lg bg-brand-primary px-3 py-1 text-sm text-white">${{ salary }}</span>
              </div>

              <input
                type="range"
                v-model="salary"
                min="300"
                max="5000"
                class="w-full accent-[#7C3AED]"
              />

              <div class="mt-1 flex justify-between text-xs text-gray-400">
                <span>$300</span>
                <span>$5k</span>
              </div>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.jobType = !openSections.jobType"
            >
              <span class="font-semibold text-gray-900">{{ props.mode === 'internship' ? 'Internship Type' : 'Job Type' }}</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.jobType ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.jobType" class="mt-2 space-y-1.5 px-1">
              <label v-for="type in jobTypes" :key="type" class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                <span>{{ type }}</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.experience = !openSections.experience"
            >
              <span class="font-semibold text-gray-900">Experience Level</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.experience ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.experience" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in experience" :key="item.name" class="flex items-center justify-between text-sm text-gray-700">
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                  <span>{{ item.name }}</span>
                </div>
                <span class="text-gray-400">{{ item.jobs }}</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.location = !openSections.location"
            >
              <span class="font-semibold text-gray-900">Job Location</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.location ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.location" class="mt-2 px-1">
              <div class="relative">
                <MapPin class="absolute left-2.5 top-2 text-gray-400" :size="14" />
                <input
                  placeholder="Search by location..."
                  class="h-8 w-full rounded-lg border border-gray-200 pl-7 text-xs outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <label class="mt-2 flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked class="h-4 w-4 accent-blue-600" />
                <span>Remote</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.department = !openSections.department"
            >
              <span class="font-semibold text-gray-900">{{ props.mode === 'internship' ? 'Field' : 'Department' }}</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.department ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.department" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in departments" :key="item" class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                <span>{{ item }}</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.companyType = !openSections.companyType"
            >
              <span class="font-semibold text-gray-900">Company Type</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.companyType ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.companyType" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in companyTypes" :key="item" class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                <span>{{ item }}</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.roleCategory = !openSections.roleCategory"
            >
              <span class="font-semibold text-gray-900">Role Category</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.roleCategory ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.roleCategory" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in roleCategories" :key="item" class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                <span>{{ item }}</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.education = !openSections.education"
            >
              <span class="font-semibold text-gray-900">Education</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.education ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.education" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in educations" :key="item" class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                <span>{{ item }}</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.postedBy = !openSections.postedBy"
            >
              <span class="font-semibold text-gray-900">Posted By</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.postedBy ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.postedBy" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in postedBy" :key="item" class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                <span>{{ item }}</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.industry = !openSections.industry"
            >
              <span class="font-semibold text-gray-900">Industry</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.industry ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.industry" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in industries" :key="item" class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                <span>{{ item }}</span>
              </label>
            </div>
          </div>

          <div class="border-b border-slate-200 pb-2">
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.freshness = !openSections.freshness"
            >
              <span class="font-semibold text-gray-900">Freshness</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.freshness ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.freshness" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in freshness" :key="item" class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                <span>{{ item }}</span>
              </label>
            </div>
          </div>

          <div>
            <button
              class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left"
              @click="openSections.applicants = !openSections.applicants"
            >
              <span class="font-semibold text-gray-900">Applicants</span>
              <ChevronDown :class="['h-4 w-4 text-slate-500 transition', openSections.applicants ? 'rotate-180' : '']" />
            </button>

            <div v-if="openSections.applicants" class="mt-2 space-y-1.5 px-1">
              <label v-for="item in applicants" :key="item.name" class="flex items-center justify-between text-sm text-gray-700">
                <div class="flex items-center gap-2">
                  <input type="checkbox" class="h-4 w-4 accent-blue-600" />
                  <span>{{ item.name }}</span>
                </div>
                <span class="text-gray-400">{{ item.jobs }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Apply Filters Button -->
    <button
      class="btn-primary mt-3 w-full shrink-0 text-sm font-large"
    >
      Apply Filters
    </button>

  </aside>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>