
<script setup lang="ts">
import { computed, ref, onMounted } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";
import ManageBusiness from "../components/ManageBusiness.vue";
import CreateJob from "../components/CreateJob.vue";

import {
  Building2,
  BriefcaseBusiness,
  Megaphone,
  Search,
  CalendarDays,
  List,
  Plus,
  PlusCircle,
  LayoutGrid,
  Settings,
  MapPin,
  Link as LinkIcon,
  ChevronRight,
} from "lucide-vue-next";

const route = useRoute();

const props = defineProps<{
  initialTab?: string;
}>();

/* =========================================================
   COMPANY DATA
========================================================= */

const company = {
  name: "WebArtifacts",
  shortName: "WA",
  description: "Building digital experiences for a better tomorrow.",
  location: "Bangalore, Karnataka",
  website: "https://webartifacts.com",
  industry: "IT Services & Consulting",
  verified: true,
  companyCount: 2,
};

/* =========================================================
   JOB DATA (5 Initial Jobs matching screenshot count)
========================================================= */

const jobs = ref<
  {
    title: string;
    location: string;
    type: string;
    applications: number;
    status: string;
    posted: string;
  }[]
>([
  {
    title: "Senior Frontend Architect",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    applications: 18,
    status: "Active",
    posted: "2 days ago",
  },
  {
    title: "Full Stack Developer",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    applications: 24,
    status: "Active",
    posted: "3 days ago",
  },
  {
    title: "Product Designer (UI/UX)",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    applications: 12,
    status: "Active",
    posted: "5 days ago",
  },
  {
    title: "DevOps & Cloud Engineer",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    applications: 9,
    status: "Active",
    posted: "1 week ago",
  },
  {
    title: "Software Engineer Intern",
    location: "Bangalore, Karnataka",
    type: "Internship",
    applications: 41,
    status: "Active",
    posted: "1 week ago",
  },
]);

/* =========================================================
   DASHBOARD NAVIGATION
========================================================= */

const activeDashboardTab = ref("Manage Jobs");

onMounted(() => {
  if (props.initialTab) {
    activeDashboardTab.value = props.initialTab;
  } else if (route.path === "/create-job" || route.query.tab === "create-job") {
    activeDashboardTab.value = "Create Job";
  }
});

const dashboardTabs = computed(() => [
  {
    id: "Manage Jobs",
    label: `Manage Jobs (${jobs.value.length})`,
    icon: BriefcaseBusiness,
  },
  {
    id: "Create Job",
    label: "Create Job",
    icon: PlusCircle,
  },
  {
    id: "Manage Business",
    label: "Manage Business",
    icon: LayoutGrid,
  },
  {
    id: "Manage Profile",
    label: "Manage Profile",
    icon: Settings,
  },
  {
    id: "Post",
    label: "Post",
    icon: Plus,
  },
]);

/* =========================================================
   JOB FILTERS
========================================================= */

const jobFilters = [
  {
    label: "All",
    count: computed(() => jobs.value.length),
    value: "all",
  },
  {
    label: "Active",
    count: computed(
      () => jobs.value.filter((j) => j.status.toLowerCase() === "active").length
    ),
    value: "active",
  },
  {
    label: "Drafts",
    count: computed(
      () => jobs.value.filter((j) => j.status.toLowerCase() === "draft").length
    ),
    value: "draft",
  },
  {
    label: "Closed",
    count: computed(
      () => jobs.value.filter((j) => j.status.toLowerCase() === "closed").length
    ),
    value: "closed",
  },
];

const activeFilter = ref("all");
const searchQuery = ref("");

/* =========================================================
   COMPUTED JOBS
========================================================= */

const filteredJobs = computed(() => {
  let result = jobs.value;

  if (activeFilter.value !== "all") {
    result = result.filter(
      (job) => job.status.toLowerCase() === activeFilter.value
    );
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();

    result = result.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
    );
  }

  return result;
});

/* =========================================================
   NAVIGATION & ACTIONS
========================================================= */

const selectDashboardTab = (tab: { id: string; label: string }) => {
  activeDashboardTab.value = tab.id;
};

const createJob = () => {
  activeDashboardTab.value = "Create Job";
};

const handleJobCreated = (newJob: any) => {
  jobs.value.unshift({
    title: newJob.title,
    location: newJob.location,
    type: newJob.type,
    applications: 0,
    status: "Active",
    posted: "Just now",
  });
  activeDashboardTab.value = "Manage Jobs";
};

/* =========================================================
   FILTER
========================================================= */

const selectFilter = (filter: string) => {
  activeFilter.value = filter;
};
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden bg-[#f5f8fc] text-slate-800">

    <!-- =====================================================
         TOP NAVBAR
    ====================================================== -->

    <Navbar :show-secondary="false" />

      <!-- ===================================================
           MAIN CONTENT
      ==================================================== -->

      <main class="mt-1 mx-auto flex min-h-0 w-full max-w-[1260px] flex-1 flex-col px-3 py-2">

        <!-- =================================================
             COMPANY HERO
        ================================================== -->

        <section
          class="relative shrink-0 overflow-hidden rounded-lg bg-gradient-to-r from-[#3925d4] via-[#286bf4] to-[#3f25c8] px-6 py-6 text-white shadow-sm"
        >

          <!-- Decorative circles -->

          <div
            class="pointer-events-none absolute -right-10 -top-20 h-34 w-34 rounded-full bg-white/5"
          ></div>

          <div
            class="pointer-events-none absolute right-32 top-0 h-20 w-20 rounded-full bg-white/5"
          ></div>

          <div
            class="pointer-events-none absolute -bottom-28 right-16 h-36 w-36 rounded-full bg-white/5"
          ></div>

          <div
            class="relative flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between"
          >

            <!-- COMPANY INFORMATION -->

            <div class="flex items-center gap-5">

              <!-- LOGO -->

              <div
                class="flex h-[95px] w-[95px] shrink-0 items-center justify-center rounded-full border-4 border-white bg-white/10 text-lg font-bold"
              >
                {{ company.shortName }}
              </div>

              <!-- DETAILS -->

              <div>

                <div class="flex flex-wrap items-center gap-3">

                  <h1 class="text-lg font-bold">
                    {{ company.name }}
                  </h1>

                  <span
                    v-if="company.verified"
                    class="flex items-center gap-1 rounded-full bg-cyan-400/90 px-3 py-1 text-xs font-bold text-white"
                  >
                    <svg
                      class="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.172 7.707 8.879a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    Verified Company
                  </span>

                </div>

                <p class="mt-1 text-xs text-blue-50">
                  {{ company.description }}
                </p>

                <!-- COMPANY META -->

                <div
                  class="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-blue-50"
                >
                  <span class="flex items-center gap-2">
                    <MapPin class="h-4 w-4" />
                    {{ company.location }}
                  </span>

                  <span class="flex items-center gap-2">
                    <LinkIcon class="h-4 w-4" />
                    {{ company.website }}
                  </span>

                  <span class="flex items-center gap-2">
                    <Building2 class="h-4 w-4" />
                    {{ company.industry }}
                  </span>
                </div>

              </div>
            </div>

          </div>
        </section>

        <!-- =================================================
             DASHBOARD TABS (Matching Screenshot Subheader)
        ================================================= -->

        <section
          class="shrink-0 rounded-sm border border-slate-200 bg-white p-2 shadow-sm"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">

            <div class="flex flex-wrap items-center gap-2">

              <button
                v-for="tab in dashboardTabs"
                :key="tab.id"
                type="button"
                @click="selectDashboardTab(tab)"
                class="flex items-center gap-2 border-b-2 px-3.5 py-2.5 text-sm font-semibold transition"
                :class="
                  activeDashboardTab === tab.id
                    ? 'border-[#4338CA] text-[#4338CA]'
                    : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
                "
              >
                <component
                  :is="tab.icon"
                  class="h-4 w-4"
                  :class="
                    activeDashboardTab === tab.id
                      ? 'text-[#4338CA]'
                      : 'text-slate-400'
                  "
                />

                <span>{{ tab.label }}</span>
              </button>

            </div>

            <button
              type="button"
              class="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600"
            >
              <Building2 class="h-3 w-3" />
              Switch / Accounts (1)
            </button>

          </div>
        </section>

<div class="min-h-0 flex-1 overflow-y-auto pr-1 scrollbar-hide">

<!-- =================================================
     DASHBOARD CONTENT
================================================= -->

<!-- Create Job -->
<div v-if="activeDashboardTab === 'Create Job'" class="mt-3">
  <CreateJob
    @back="activeDashboardTab = 'Manage Jobs'"
    @cancel="activeDashboardTab = 'Manage Jobs'"
    @created="handleJobCreated"
  />
</div>

<!-- Manage Business -->
<ManageBusiness
  v-else-if="activeDashboardTab === 'Manage Business'"
/>

<!-- Manage Profile -->
<section
  v-else-if="activeDashboardTab === 'Manage Profile'"
  class="mt-3 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm"
>
  <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
    <Settings class="h-7 w-7" />
  </div>
  <h3 class="mt-4 text-base font-bold text-slate-900">Manage Profile</h3>
  <p class="mt-1 text-xs text-slate-500">Configure company public profile, branding, and verification.</p>
</section>

<!-- Post -->
<section
  v-else-if="activeDashboardTab === 'Post'"
  class="mt-3 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm"
>
  <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
    <Megaphone class="h-7 w-7" />
  </div>
  <h3 class="mt-4 text-base font-bold text-slate-900">Company Announcements & Posts</h3>
  <p class="mt-1 text-xs text-slate-500">Share updates, milestones, and hiring news with candidate network.</p>
</section>
        <!-- =================================================
             JOB SEARCH / FILTER BAR
        ================================================== -->

        <section
          v-if="activeDashboardTab === 'Manage Jobs'"
          class="mt-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
        >

          <div
            class="flex flex-col gap-3 xl:flex-row xl:items-center"
          >

            <!-- SEARCH -->

            <div class="relative flex-1">

              <Search
                class="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
              />

              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search job title, company, date..."
                class="h-8 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />

            </div>

            <!-- DATE -->

            <button
              type="button"
              class="flex h-8 items-center justify-between gap-5 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <span class="flex items-center gap-2">
                <CalendarDays class="h-4 w-4 text-violet-600" />
                Select Date Range
              </span>

              <ChevronRight class="h-4 w-4 text-slate-500" />
            </button>

            <!-- FILTERS -->

            <div class="flex flex-wrap items-center gap-2">

              <button
                v-for="filter in jobFilters"
                :key="filter.value"
                type="button"
                @click="selectFilter(filter.value)"
                class="rounded-full px-2 py-1 text-xs font-semibold transition"
                :class="
                  activeFilter === filter.value
                    ? 'bg-violet-600 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                "
              >
                {{ filter.label }}
                ({{ filter.count }})
              </button>

            </div>

            <!-- TABLE VIEW -->

            <button
              type="button"
              class="flex h-8 shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <List class="h-4 w-4 text-violet-600" />
              Table View
            </button>

            <!-- CREATE JOB -->

            <button
              type="button"
              @click="createJob"
              class="flex h-8 shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700"
            >
              <Plus class="h-4 w-4" />
              Create Job Post
            </button>

          </div>
        </section>

        <!-- =================================================
             JOB CONTENT
        ================================================== -->

        <section
          v-if="activeDashboardTab === 'Manage Jobs'"
          class=" min-h-[435px] rounded-lg border border-slate-200 bg-white shadow-sm"
        >

          <!-- =================================================
               EMPTY STATE
          ================================================== -->

          <div
            v-if="filteredJobs.length === 0"
            class="flex min-h-[400px] flex-col items-center justify-center px-5 text-center"
          >

            <!-- ILLUSTRATION -->

            <div class="relative mb-5">

            </div>

            <!-- TITLE -->

            <h2 class="text-lg font-bold text-slate-800">
              No Job Posts Found
            </h2>

            <!-- DESCRIPTION -->

            <p class=" max-w-[560px] text-sm leading-6 text-slate-500">
              No job postings match your current criteria.
              Create a new job post to get started!
            </p>

            <!-- CREATE JOB -->

            <button
              type="button"
              @click="createJob"
              class="mt-5 flex items-center gap-3 rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold text-white shadow-md transition hover:bg-violet-700"
            >
              <Plus class="h-4 w-4" />
              Create Job Post
            </button>

          </div>

          <!-- =================================================
               JOB TABLE
          ================================================== -->

          <div
            v-else
            class="overflow-x-auto p-4"
          >
            <table
              class="w-full min-w-[900px] border-collapse text-left"
            >

              <thead>
                <tr
                  class="rounded-sm bg-[#f8faff] text-xs font-semibold text-slate-500"
                >
                  <th class="px-4 py-4">
                    Job Title
                  </th>

                  <th class="px-4 py-4">
                    Location
                  </th>

                  <th class="px-4 py-4">
                    Type
                  </th>

                  <th class="px-4 py-4">
                    Applications
                  </th>

                  <th class="px-4 py-4">
                    Status
                  </th>

                  <th class="px-4 py-4">
                    Posted On
                  </th>

                  <th class="px-4 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr
                  v-for="job in filteredJobs"
                  :key="job.title"
                  class="border-b border-slate-100 text-sm last:border-0 hover:bg-slate-50/50"
                >

                  <td class="px-4 py-5">
                    <p class="font-bold text-slate-800">
                      {{ job.title }}
                    </p>
                  </td>

                  <td class="px-4 py-5 text-slate-600">
                    {{ job.location }}
                  </td>

                  <td class="px-4 py-5">
                    <span
                      class="rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-700"
                    >
                      {{ job.type }}
                    </span>
                  </td>

                  <td class="px-4 py-5 text-slate-600">
                    {{ job.applications }}
                  </td>

                  <td class="px-4 py-5">
                    <span
                      class="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                    >
                      {{ job.status }}
                    </span>
                  </td>

                  <td class="px-4 py-5 text-slate-600">
                    {{ job.posted }}
                  </td>

                  <td class="px-4 py-5">
                    <button
                      type="button"
                      class="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
                    >
                      •••
                    </button>
                  </td>

                </tr>

              </tbody>

            </table>
          </div>

        </section>

        </div>
      </main>
  </div>
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