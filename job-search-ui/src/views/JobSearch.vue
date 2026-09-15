<script setup lang="ts">
import JobDetails from "../components/JobDetails.vue";
import { computed, ref } from "vue";
import type { Job } from "../types/job";
import Navbar from "../components/Navbar.vue";
import FilterSidebar from "../components/FilterSidebar.vue";
import RightSidebar from "../components/RightSidebar.vue";
import JobCard from "../components/JobCard.vue";
import { jobs } from "../data/jobs";
import { Bookmark, Send, CalendarCheck2 } from "lucide-vue-next";

// mark imported component as used for TypeScript/no-unused checks
void RightSidebar;

const selectedJob = ref<Job | null>(null);
const savedJobs = ref<Job[]>([]);
const appliedJobs = ref<Job[]>([]);
const viewMode = ref<"all" | "internship" | "jobs">("all");
const searchQuery = ref("");
const showActivitiesMenu = ref(false);
const activeActivitySection = ref<"saved" | "applied" | "interview" | "">("");
const activePage = ref<'main' | 'categories'>('main');
const categories = [
  'All category',
  'Internship',
  'Jobs',
  'Freshers',
  'Government openings',
  'Recommended',
];

const visibleJobs = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();

  return jobs.filter((job) => {
    const modeMatches =
      viewMode.value === "internship"
        ? job.type.toLowerCase().includes("internship")
        : viewMode.value === "jobs"
          ? job.type.toLowerCase().includes("full time") ||
            job.type.toLowerCase().includes("remote") ||
            job.type.toLowerCase().includes("contract")
          : true;

    if (!query) {
      return modeMatches;
    }

    const haystack = [job.title, job.company, job.location, ...(job.skills || [])]
      .join(" ")
      .toLowerCase();

    return modeMatches && haystack.includes(query);
  });
});

const filterMode = computed(() => (viewMode.value === "internship" ? "internship" : "job"));
const showRecommendedPopup = ref(false);

function closeDetails() {
  selectedJob.value = null;
}

function selectJob(job: Job) {
  selectedJob.value = job;
}

function handleModeChange(mode: string) {
  activePage.value = 'main';
  showActivitiesMenu.value = false;
  activeActivitySection.value = '';
  selectedJob.value = null;

  if (mode === "Internship") {
    viewMode.value = "internship";
  } else if (mode === "Jobs") {
    viewMode.value = "jobs";
  } else {
    viewMode.value = "all";
  }
}

function handleSearchChange(query: string) {
  searchQuery.value = query;
}

function handleOpenMyActivities() {
  closeDetails();
  activePage.value = 'main';
  showActivitiesMenu.value = true;
  activeActivitySection.value = "";
}

function handleNavigateToCategories() {
  activePage.value = 'categories';
}

function handleShowRecommendedPopup() {
  showRecommendedPopup.value = true;
}

function goToCategoryPage(category: string) {
  if (category === 'All category') {
    activePage.value = 'main';
    viewMode.value = 'all';
    selectedJob.value = null;
    showActivitiesMenu.value = false;
    return;
  }

  if (category === 'Internship') {
    activePage.value = 'main';
    viewMode.value = 'internship';
    selectedJob.value = null;
    showActivitiesMenu.value = false;
    return;
  }

  if (category === 'Jobs') {
    activePage.value = 'main';
    viewMode.value = 'jobs';
    selectedJob.value = null;
    showActivitiesMenu.value = false;
    return;
  }

  activePage.value = 'categories';
}

function toggleSavedJob(job: Job, isSaved: boolean) {
  if (isSaved) {
    if (!savedJobs.value.some((savedJob) => savedJob.title === job.title)) {
      savedJobs.value = [...savedJobs.value, job];
    }
  } else {
    savedJobs.value = savedJobs.value.filter((savedJob) => savedJob.title !== job.title);
  }
}

function handleApply(job: Job) {
  if (!appliedJobs.value.some((appliedJob) => appliedJob.title === job.title)) {
    appliedJobs.value = [...appliedJobs.value, job];
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-[#F5F7FB] flex flex-col overflow-hidden">
    <!-- Navbar -->
    <Navbar
      @mode-change="handleModeChange"
      @search-change="handleSearchChange"
      @open-my-activities="handleOpenMyActivities"
      @navigate-seekers="handleNavigateToCategories"
      @show-recommended-popup="handleShowRecommendedPopup"
    />

    <div class="flex-1 flex flex-col min-h-0 max-w-7xl mx-auto w-full px-6 pt-3 pb-1.5">
      <transition name="fade">
        <div
          v-if="showRecommendedPopup"
          class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4"
        >
          <div class="w-full max-w-md overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
            <div class="bg-gradient-to-r from-[#F7EDFF] via-white to-[#F0F9FF] px-6 py-5 sm:px-7">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="text-sm font-semibold tracking-[0.01em] text-[#A100FF]">Recommended for you</p>
                  <h2 class="mt-2 text-2xl font-semibold text-slate-900">Complete your skills section</h2>
                  <p class="mt-2 text-sm leading-6 text-slate-600">Add your skills to unlock job suggestions that are a much better fit for your profile.</p>
                </div>
              </div>
            </div>

            <div class="px-6 py-5 sm:px-7">
              <div class="rounded-lg border border-[#E4C2FF] bg-[#F7EDFF] p-5 text-center">
                <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#A100FF] shadow-sm">
                  <span class="text-xl font-semibold">✦</span>
                </div>
                <p class="text-sm leading-6 text-slate-700">Complete your profile and discover more tailored opportunities in seconds.</p>
              </div>

              <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  @click="showRecommendedPopup = false"
                  class="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                >
                  Maybe Later
                </button>
                <button
                  @click="showRecommendedPopup = false"
                  class="rounded-2xl bg-[#A100FF] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8a00e6]"
                >
                  Update Skills
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <template v-if="activePage === 'categories'">
        <div class="flex-1 min-h-0 overflow-y-auto px-0.5" style="scrollbar-width:none; -ms-overflow-style:none;">
          <div class="mx-auto max-w-6xl px-4 py-6">
            <div class="mb-6 flex items-center justify-between">
              <button
                @click="activePage = 'main'"
                class="btn-link text-sm font-semibold"
              >
                ← Back to Search
              </button>
              <h1 class="text-2xl font-semibold text-slate-900">All Categories</h1>
              <div />
            </div>

            <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <button
                v-for="category in categories"
                :key="category"
                type="button"
                @click="goToCategoryPage(category)"
                class="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-brand-primary hover:bg-brand-surface hover:shadow-md"
              >
                <h2 class="text-base font-semibold text-slate-900">{{ category }}</h2>
                <p class="mt-2 text-sm text-slate-500">Explore jobs and opportunities in the {{ category.toLowerCase() }} category.</p>
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex-1 min-h-0">
          <div v-if="!selectedJob" class="flex-1 min-h-0 h-full grid grid-cols-[280px_minmax(0,1fr)_280px] gap-3 overflow-hidden">
            <!-- Left Sidebar -->
            <div
              class="h-full min-h-0 overflow-y-auto px-0"
              style="scrollbar-width:none; -ms-overflow-style:none;"
            >
              <template v-if="showActivitiesMenu">
                <div class="ui-card overflow-hidden h-full">
                  <div class="h-full flex flex-col">
                    <h2 class="text-lg font-semibold text-slate-900 px-3 py-3 border-b border-slate-200">My Activities</h2>

                    <div class="mt-2 -ml-1 space-y-2 flex-1 px-2 overflow-y-auto">
                      <button
                        @click="activeActivitySection = 'saved'"
                        :class="activeActivitySection === 'saved' ? 'bg-brand-surface text-brand-primary' : 'text-slate-700 hover:bg-slate-50 hover:text-brand-primary'"
                        class="group w-full flex items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-semibold transition"
                      >
                        <div
                          class="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                          :class="activeActivitySection === 'saved' ? 'bg-brand-surface text-brand-primary' : 'bg-blue-50 text-slate-900 group-hover:bg-brand-surface group-hover:text-brand-primary'"
                        >
                          <Bookmark class="h-4 w-4" />
                        </div>
                        <div>
                          <p class="text-sm">Saved Jobs</p>
                          <p class="text-[11px] font-normal text-slate-500">Jobs you saved for later</p>
                        </div>
                      </button>

                      <button
                        @click="activeActivitySection = 'applied'"
                        :class="activeActivitySection === 'applied' ? 'bg-brand-surface text-brand-primary' : 'text-slate-700 hover:bg-slate-50 hover:text-brand-primary'"
                        class="group w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-semibold transition"
                      >
                        <div
                          class="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                          :class="activeActivitySection === 'applied' ? 'bg-brand-surface text-brand-primary' : 'bg-blue-50 text-slate-900 group-hover:bg-brand-surface group-hover:text-brand-primary'"
                        >
                          <Send class="h-4 w-4" />
                        </div>
                        <div>
                          <p class="text-sm">Applied Jobs</p>
                          <p class="text-[11px] font-normal text-slate-500">Jobs you have applied to</p>
                        </div>
                      </button>

                      <button
                        @click="activeActivitySection = 'interview'"
                        :class="activeActivitySection === 'interview' ? 'bg-brand-surface text-brand-primary' : 'text-slate-700 hover:bg-slate-50 hover:text-brand-primary'"
                        class="group w-full flex items-center gap-2 rounded-2xl px-3 py-2 text-left text-sm font-semibold transition"
                      >
                        <div
                          class="flex h-8 w-8 items-center justify-center rounded-2xl transition-colors"
                          :class="activeActivitySection === 'interview' ? 'bg-brand-surface text-brand-primary' : 'bg-blue-50 text-slate-900 group-hover:bg-brand-surface group-hover:text-brand-primary'"
                        >
                          <CalendarCheck2 class="h-4 w-4" />
                        </div>
                        <div>
                          <p class="text-sm">Interviews</p>
                          <p class="text-[11px] font-normal text-slate-500">Upcoming interviews</p>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <FilterSidebar :mode="filterMode" />
              </template>
            </div>

            <!-- Main Content / My Activities Menu -->
            <div
              class="h-full min-h-0 overflow-y-auto px-0 "
              style="scrollbar-width:none; -ms-overflow-style:none;"
            >
              <template v-if="showActivitiesMenu">
                <div class="p-1">
                  <template v-if="!activeActivitySection">
                    <div class="rounded-lg border border-slate-200 bg-slate-50 px-6 py-10 text-center">
                      <h2 class="text-lg font-semibold text-slate-900">Manage Your Job Search</h2>
                      <p class="text-sm text-slate-500 mt-2">Choose an activity to continue.</p>
                    </div>
                  </template>

                  <div class="mt-2">
                    <div v-if="activeActivitySection === 'saved'">
                      <div v-if="savedJobs.length" class="space-y-3">
                        <JobCard
                          v-for="job in savedJobs"
                          :key="job.title"
                          :job="job"
                          :saved="true"
                          :variant="viewMode === 'internship' ? 'internship' : 'job'"
                          @viewDetails="selectJob($event)"
                          @save="toggleSavedJob"
                        />
                      </div>
                      <div v-else class="rounded-lg border border-slate-200 bg-slate-50 px-6 py-10 text-center">
                        <h3 class="text-lg font-semibold text-slate-900">No saved jobs yet.</h3>
                        <p class="text-sm text-slate-500 mt-2">Save jobs to keep them here and revisit them later.</p>
                      </div>
                    </div>

                    <div v-if="activeActivitySection === 'applied'">
                      <div v-if="appliedJobs.length" class="space-y-3">
                        <JobCard
                          v-for="job in appliedJobs"
                          :key="job.title"
                          :job="job"
                          :saved="savedJobs.some((savedJob) => savedJob.title === job.title)"
                          :variant="viewMode === 'internship' ? 'internship' : 'job'"
                          @viewDetails="selectJob($event)"
                          @save="toggleSavedJob"
                        />
                      </div>
                      <div v-else class="rounded-lg border border-slate-200 bg-slate-50 px-6 py-10 text-center">
                        <h3 class="text-lg font-semibold text-slate-900">No applied jobs yet.</h3>
                        <p class="text-sm text-slate-500 mt-2">Apply to jobs and track them here as you move forward.</p>
                      </div>
                    </div>

                    <div v-if="activeActivitySection === 'interview'">
                      <div class="rounded-lg border border-slate-200 bg-slate-50 px-6 py-10 text-center">
                        <h3 class="text-lg font-semibold text-slate-900">No interview items to display yet.</h3>
                        <p class="text-sm text-slate-500 mt-2">Your upcoming interview schedule will appear here.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="space-y-3">
                  <JobCard
                    v-for="job in visibleJobs"
                    :key="job.title"
                    :job="job"
                    :saved="savedJobs.some((savedJob) => savedJob.title === job.title)"
                    :variant="viewMode === 'internship' ? 'internship' : 'job'"
                    @viewDetails="selectJob($event)"
                    @save="toggleSavedJob"
                  />
                </div>
              </template>
            </div>

            <!-- Right Sidebar -->
            <div
              class="min-h-0 overflow-y-auto px-0"
              style="scrollbar-width:none; -ms-overflow-style:none;"
            >
              <RightSidebar />
            </div>
          </div>

          <div v-else class="flex-1 min-h-0 h-full grid grid-cols-[34%_66%] gap-0 overflow-hidden">
            <!-- Left : Job Cards -->
            <div
              class="h-full min-h-0 overflow-y-auto pr-0.5"
              style="scrollbar-width:none; -ms-overflow-style:none;"
            >
              <div class="space-y-3">
                <JobCard
                  v-for="job in visibleJobs"
                  :key="job.title"
                  :job="job"
                  :saved="savedJobs.some((savedJob) => savedJob.title === job.title)"
                  :variant="viewMode === 'internship' ? 'internship' : 'job'"
                  @viewDetails="selectJob($event)"
                  @save="toggleSavedJob"
                />
              </div>
            </div>

            <!-- Right : Job Details -->
            <div
              class="h-full min-h-0 overflow-hidden pl-0.5"
            >
              <JobDetails
                :job="selectedJob!"
                :is-applied-job="appliedJobs.some((appliedJob) => appliedJob.title === selectedJob?.title)"
                @close="closeDetails"
                @apply="handleApply"
              />
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style scoped>
  div::-webkit-scrollbar {
    display: none;
  }
</style>