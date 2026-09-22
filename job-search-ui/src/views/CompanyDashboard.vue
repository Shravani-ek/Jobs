
<script setup lang="ts">
import { computed, ref, reactive, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";

import Navbar from "../components/Navbar.vue";
import ManageBusiness from "../components/ManageBusiness.vue";
import CreateJob from "../components/CreateJob.vue";
import ManageProfile from "../components/manage-profile/ManageProfile.vue";
import CreatePostModal from "../components/CreatePostModal.vue";

import {
  Building2,
  BriefcaseBusiness,
  Search,
  CalendarDays,
  List,
  Plus,
  PlusCircle,
  LayoutGrid,
  Settings,
  MapPin,
  ChevronRight,
  CheckCircle2,
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  Trash2,
  Users,
  SquarePen,
  PanelLeftClose,
  PanelLeft,
  ChevronUp,
  Globe,
  Calendar,
  Home,
  Info,
  Briefcase,
  Heart,
  Check,
} from "lucide-vue-next";

const route = useRoute();

const props = defineProps<{
  initialTab?: string;
}>();

/* =========================================================
   COMPANY DATA
========================================================= */

const company = reactive({
  name: "WebArtifacts",
  shortName: "WA",
  tagline: "Building modern digital experiences",
  headline: "WE ARE A TECHNOLOGY-FOCUSED COMPANY COMMITTED TO DELIVERING INNOVATIVE DIGITAL SOLUTIONS...",
  description: "We are a technology-focused company committed to delivering innovative digital solutions that help businesses grow and improve their operations. We provide reliable software and cloud architectures.",
  location: "Pune, Maharashtra, India",
  website: "https://www.webartifacts.com",
  websiteDisplay: "www.webartifacts.com",
  industry: "Software & IT Services",
  size: "11-50 employees",
  foundedYear: "2026",
  verified: true,
  companyCount: 2,
});

/* =========================================================
   JOB DATA
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
>([]);

/* =========================================================
   DASHBOARD NAVIGATION
========================================================= */

const activeDashboardTab = ref("Manage Jobs");

onMounted(() => {
  if (props.initialTab) {
    activeDashboardTab.value = props.initialTab;
  } else if (route.path === "/create-job" || route.query.tab === "create-job") {
    activeDashboardTab.value = "Create Job";
  } else if (route.path === "/manage-profile" || route.query.tab === "manage-profile") {
    activeDashboardTab.value = "Manage Profile";
  }
});

const isSidebarHovered = ref(false);
const isSidebarPinned = ref(false);
const isExpanded = computed(() => isSidebarHovered.value || isSidebarPinned.value);

const dashboardTabs = computed(() => [
  {
    id: "Manage Jobs",
    label: "Manage Jobs",
    icon: BriefcaseBusiness,
    badge: jobs.value.length,
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
    label: "Post & Updates",
    icon: Send,
    badge: companyPosts.value.length > 0 ? companyPosts.value.length : undefined,
  },
]);


const showHeroCard = computed(() => {
  return !["Manage Jobs", "Create Job", "Post"].includes(activeDashboardTab.value);
});

const heroTabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "services", label: "Services", icon: LayoutGrid },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "team", label: "Team", icon: Users },
  { id: "culture", label: "Culture", icon: Heart },
];

const activeHeroTab = ref("overview");

function selectHeroTab(tabId: string) {
  activeHeroTab.value = tabId;
  if (tabId === "jobs") {
    activeDashboardTab.value = "Manage Jobs";
  } else if (tabId === "overview") {
    activeDashboardTab.value = "Manage Business";
    nextTick(() => {
      const el = document.getElementById("section-about");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } else {
    if (activeDashboardTab.value !== "Manage Business") {
      activeDashboardTab.value = "Manage Business";
    }
    nextTick(() => {
      const targetMap: Record<string, string> = {
        about: "section-about",
        services: "section-services",
        team: "section-team",
        culture: "section-culture",
      };
      const targetId = targetMap[tabId];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
}

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
   POSTS STATE & ACTIONS
========================================================= */

interface PostItem {
  id: string;
  author: string;
  initial: string;
  role: string;
  time: string;
  content: string;
  audience: string;
  attachment?: {
    name: string;
    url?: string;
    type: string;
  };
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const showPostModal = ref(false);
const showPostToast = ref(false);

const companyPosts = ref<PostItem[]>([
  {
    id: "post-1",
    author: "WebArtifacts",
    initial: "S",
    role: "Company Admin",
    time: "2h ago",
    content: "🚀 We are thrilled to announce that WebArtifacts is expanding our engineering and product teams! We're actively hiring across Frontend, Backend, and Design roles. Check out our open positions in the Manage Jobs tab!",
    audience: "Everyone",
    likes: 24,
    comments: 5,
    isLiked: false,
  },
  {
    id: "post-2",
    author: "WebArtifacts",
    initial: "S",
    role: "Company Admin",
    time: "1d ago",
    content: "🎉 Proud to share that our team has achieved 99.98% platform uptime across all enterprise client deployments this quarter. Huge kudos to our infrastructure team!",
    audience: "Everyone",
    likes: 42,
    comments: 8,
    isLiked: true,
  },
]);

function handleNewPost(data: {
  text: string;
  audience: string;
  attachment?: { name: string; url?: string; type: string };
}) {
  companyPosts.value.unshift({
    id: `post-${Date.now()}`,
    author: company.name || "WebArtifacts",
    initial: "S",
    role: "Company Admin",
    time: "Just now",
    content: data.text,
    audience: data.audience || "Everyone",
    attachment: data.attachment,
    likes: 0,
    comments: 0,
    isLiked: false,
  });

  showPostToast.value = true;
  setTimeout(() => {
    showPostToast.value = false;
  }, 4000);
}

function togglePostLike(post: PostItem) {
  post.isLiked = !post.isLiked;
  post.likes += post.isLiked ? 1 : -1;
}

function deletePost(postId: string) {
  companyPosts.value = companyPosts.value.filter((p) => p.id !== postId);
}

/* =========================================================
   NAVIGATION & ACTIONS
========================================================= */

const selectDashboardTab = (tab: { id: string; label: string }) => {
  if (tab.id === "Post") {
    showPostModal.value = true;
    activeDashboardTab.value = "Post";
    return;
  }
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
    status: newJob.status || "Active",
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

function handleProfileSaved(data: any) {
  if (data?.profile?.name) {
    company.name = data.profile.name;
    const parts = data.profile.name.trim().split(/\s+/);
    company.shortName = parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : data.profile.name.slice(0, 2).toUpperCase();
  }
  if (data?.profile?.tagline) {
    company.description = data.profile.tagline;
  }
  if (data?.profile?.industry) {
    company.industry = data.profile.industry;
  }
  if (data?.contact?.city || data?.contact?.country) {
    company.location = [data.contact.city, data.contact.country].filter(Boolean).join(", ");
  }
  if (data?.contact?.website) {
    company.website = data.contact.website;
  }
}

function handleProfileRemoved() {
  company.name = "WebArtifacts";
  company.shortName = "WA";
  company.description = "No company description added yet.";
  company.location = "Not specified";
  company.website = "";
  company.industry = "";
  company.verified = false;
}
</script>

<template>
  <div class="fixed inset-0 flex flex-col overflow-hidden bg-[#f5f8fc] text-slate-800">

    <!-- =====================================================
         TOP NAVBAR
    ====================================================== -->
    <Navbar :show-secondary="false" />

    <!-- =====================================================
         DASHBOARD BODY (Below Navbar, aligned with NxtTurn logo)
    ====================================================== -->
    <div class="flex-1 flex min-h-0 max-w-7xl mx-auto w-full px-6 pt-3 pb-3 gap-3 relative overflow-hidden">

      <!-- ===================================================
           HOVER-EXPANDABLE LEFT SIDEBAR (Directly Below NxtTurn Logo)
      ==================================================== -->
      <aside
        @mouseenter="isSidebarHovered = true"
        @mouseleave="isSidebarHovered = false"
        class="z-30 flex h-full flex-col rounded-lg border border-slate-200 bg-white transition-all duration-300 ease-in-out select-none shadow-xs"
        :class="[
          isExpanded ? 'w-64 shadow-2xl' : 'w-16',
          isSidebarPinned ? 'relative' : 'absolute left-6 top-3 bottom-3'
        ]"
      >
        <!-- Top Window Dots + Pin Toggle -->
        <div class="flex items-center justify-between px-3.5 pt-3 pb-2">

          <button
            v-if="isExpanded"
            type="button"
            @click="isSidebarPinned = !isSidebarPinned"
            class="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition cursor-pointer"
            :title="isSidebarPinned ? 'Unpin sidebar (collapse to icons)' : 'Pin sidebar open'"
          >
            <PanelLeftClose v-if="isSidebarPinned" class="h-4 w-4" />
            <PanelLeft v-else class="h-4 w-4" />
          </button>
        </div>

        <!-- User / Company Header -->
        <div class="flex items-center px-3 py-2 border-b border-slate-100">
          <div class="flex items-center gap-2.5 min-w-0 flex-1" :class="isExpanded ? '' : 'justify-center'">
            <div
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] via-indigo-600 to-cyan-500 text-xs font-black text-white shadow-sm shadow-blue-500/20 select-none"
            >
              {{ company.shortName || 'WA' }}
            </div>

            <div v-if="isExpanded" class="min-w-0 flex-1 overflow-hidden transition-opacity duration-200">
              <div class="flex items-center gap-1">
                <span class="text-xs font-bold text-slate-900 truncate">{{ company.name || 'WebArtifacts' }}</span>
                <CheckCircle2 class="h-3.5 w-3.5 text-blue-600 shrink-0" />
              </div>
              <p class="text-[10px] text-slate-400 truncate font-medium">Employer Portal</p>
            </div>
          </div>
        </div>

        <!-- Action Button (Create Job) -->
        <div class="px-2.5 py-2.5">
          <button
            v-if="isExpanded"
            type="button"
            @click="createJob"
            class="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-blue-50 hover:border-blue-200 hover:text-[#2563EB] px-3 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition cursor-pointer"
          >
            <SquarePen class="h-4 w-4 text-slate-600 group-hover:text-[#2563EB]" />
            <span>Create Job</span>
          </button>

          <button
            v-else
            type="button"
            @click="createJob"
            class="flex h-9 w-9 mx-auto items-center justify-center rounded-xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 hover:text-[#2563EB] text-slate-700 shadow-2xs transition cursor-pointer"
            title="Create Job"
          >
            <SquarePen class="h-4 w-4" />
          </button>
        </div>

        <!-- Main Navigation Items -->
        <nav class="space-y-1 px-2 flex-1 overflow-y-auto" style="scrollbar-width:none;-ms-overflow-style:none;">
          <button
            v-for="tab in dashboardTabs"
            :key="tab.id"
            type="button"
            @click="selectDashboardTab(tab)"
            class="group relative flex w-full items-center rounded-lg transition-colors cursor-pointer"
            :class="[
              isExpanded ? 'px-2.5 py-2' : 'h-10 justify-center',
              activeDashboardTab === tab.id
                ? 'text-[#2563EB] font-bold bg-blue-50/70'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
            ]"
            :title="!isExpanded ? tab.label : ''"
          >
            <!-- Blue Active Indicator Bar on left edge (matching screenshot) -->
            <span
              v-if="activeDashboardTab === tab.id"
              class="absolute left-0 top-1 bottom-1 w-1 rounded-r bg-[#2563EB]"
            />

            <!-- Icon -->
            <component
              :is="tab.icon"
              class="h-4 w-4 shrink-0 transition-colors"
              :class="[
                activeDashboardTab === tab.id ? 'text-[#2563EB]' : 'text-slate-400 group-hover:text-slate-600',
                isExpanded ? 'mr-3' : 'mx-auto'
              ]"
            />

            <!-- Label -->
            <span v-if="isExpanded" class="flex-1 text-left text-xs truncate">
              {{ tab.label }}
            </span>

            <!-- Badge (e.g. blue pill badge with count) -->
            <template v-if="isExpanded">
              <span
                v-if="tab.badge !== undefined"
                class="ml-auto rounded-md px-2 py-0.5 text-[10px] font-bold"
                :class="activeDashboardTab === tab.id ? 'bg-[#2563EB] text-white' : 'bg-slate-100 text-slate-600'"
              >
                {{ tab.badge }}
              </span>
            </template>
            <template v-else>
              <span
                v-if="tab.badge !== undefined && tab.badge > 0"
                class="absolute top-2 right-2.5 h-2 w-2 rounded-full bg-[#2563EB]"
              />
            </template>
          </button>

          <!-- Collapsible Section: ACCOUNTS & SWITCH (matching RECENT CHATS in screenshot) -->
          <div v-if="isExpanded" class="mt-4 pt-3 pb-2 border-t border-slate-100">
            <div class="flex items-center justify-between px-2 pb-1.5">
              <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Accounts
              </span>
              <ChevronUp class="h-3 w-3 text-slate-400" />
            </div>

            <button
              type="button"
              class="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 transition cursor-pointer"
            >
              <PlusCircle class="h-3.5 w-3.5" />
              <span>Switch / Add Account</span>
            </button>

            <div class="mt-1 flex items-center justify-between rounded-lg p-2 hover:bg-slate-50 transition">
              <div class="flex items-center gap-2 min-w-0">
                <div class="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shrink-0">
                  WA
                </div>
                <div class="min-w-0">
                  <p class="text-xs font-bold text-slate-800 truncate">{{ company.name || 'WebArtifacts' }}</p>
                  <p class="text-[10px] text-slate-400">Primary (1)</p>
                </div>
              </div>
              <span class="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            </div>
          </div>
        </nav>

        <!-- Collapsed Bottom Switch Account Button -->
        <div v-if="!isExpanded" class="p-2 border-t border-slate-100 flex flex-col items-center gap-2">
          <button
            type="button"
            class="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition cursor-pointer"
            title="Switch Account (1)"
          >
            <Building2 class="h-4 w-4" />
          </button>
        </div>
      </aside>

      <!-- Placeholder spacer for collapsed sidebar width (64px) when sidebar is floating/unpinned -->
      <div v-if="!isSidebarPinned" class="w-16 shrink-0" />

      <!-- ===================================================
           MAIN CONTENT
      ==================================================== -->
      <main
        class="flex-1 min-h-0 flex flex-col pr-1 scrollbar-hide"
        :class="activeDashboardTab === 'Create Job' ? 'overflow-hidden' : 'overflow-y-auto'"
      >

        <!-- =================================================
             HERO BANNER (SCROLLS UP WITH PAGE)
        ================================================== -->
        <div
          v-if="showHeroCard"
          class="shrink-0 relative overflow-hidden border-slate-200/80 bg-slate-900 min-h-[200px] sm:min-h-[280px] md:min-h-[300px] flex items-center shadow-xs select-none"
          :class="activeDashboardTab === 'Manage Business' ? 'rounded-t-lg border-x border-t' : 'rounded-lg border mb-2'"
          style="background-image: url('/images/office-banner.jpg'); background-size: cover; background-position: center;"
        >
          <!-- Atmospheric Gradient Overlay (Deep Navy fading left-to-right) -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-[#0d1b36]/95 via-[#142647]/85 via-50% to-[#142647]/10"
          />

          <!-- Banner Content -->
          <div
            class="relative z-10 flex w-full flex-col lg:flex-row items-start lg:items-center justify-between gap-6 px-6 py-5 sm:px-8"
          >
            <!-- LEFT: Brand Logo & Information -->
            <div class="flex items-center gap-4 sm:gap-6">
              <!-- Large White Logo Box -->
              <div
                class="flex h-20 w-20 sm:h-24 sm:w-24 shrink-0 items-center justify-center rounded-2xl bg-white p-2.5 shadow-xl ring-1 ring-black/5 select-none"
              >
                <span
                  class="text-3xl sm:text-4xl font-black tracking-tighter bg-gradient-to-br from-[#2563EB] via-indigo-600 to-violet-600 bg-clip-text text-transparent"
                >
                  WA
                </span>
              </div>

              <!-- Company Details -->
              <div class="flex flex-col gap-1">
                <!-- Company Name + Verified Badge -->
                <div class="flex items-center gap-2">
                  <h1 class="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {{ company.name || 'WebArtifacts' }}
                  </h1>
                  <!-- Blue Verified Badge -->
                  <span
                    class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white shadow-xs"
                    title="Verified Employer"
                  >
                    <Check class="h-3 w-3 stroke-[3]" />
                  </span>
                </div>

                <!-- Tagline -->
                <p class="text-xs sm:text-sm font-medium text-slate-200/90 leading-snug">
                  {{ company.tagline || 'Building modern digital experiences' }}
                </p>

                <!-- Metadata Row -->
                <div
                  class="mt-1 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs font-medium text-slate-200/80"
                >
                  <!-- Website -->
                  <a
                    :href="company.website || 'https://www.webartifacts.com'"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center gap-1.5 hover:text-white transition"
                  >
                    <Globe class="h-3.5 w-3.5 text-slate-300 shrink-0" />
                    <span>{{ company.websiteDisplay || 'www.webartifacts.com' }}</span>
                  </a>

                  <!-- Location -->
                  <span class="flex items-center gap-1.5">
                    <MapPin class="h-3.5 w-3.5 text-slate-300 shrink-0" />
                    <span>{{ company.location || 'Pune, Maharashtra, India' }}</span>
                  </span>

                  <!-- Company Size -->
                  <span class="flex items-center gap-1.5">
                    <Users class="h-3.5 w-3.5 text-slate-300 shrink-0" />
                    <span>{{ company.size || '11-50 employees' }}</span>
                  </span>

                  <!-- Founded Year -->
                  <span class="flex items-center gap-1.5">
                    <Calendar class="h-3.5 w-3.5 text-slate-300 shrink-0" />
                    <span>Est. {{ company.foundedYear || '2026' }}</span>
                  </span>
                </div>
              </div>
            </div>

            <!-- RIGHT: Inspiring Brand Slogan / Mantra Typography -->
            <div class="hidden lg:flex flex-col items-start pr-6 select-none">
              <div class="text-[#0f172a] font-black text-xl sm:text-2xl leading-[1.12] tracking-tight">
                <div>Better</div>
                <div>Technology</div>
                <div>Brighter</div>
                <div>Tomorrow</div>
              </div>
              <!-- Small Accent Bar -->
              <div class="mt-2.5 h-1 w-10 rounded-full bg-[#2563EB]" />
            </div>
          </div>
        </div>

        <!-- STICKY SUB-NAVBAR TABS BAR (STOPS ON REACHING TOP, KEEPS FIXED THERE) -->
        <div
          v-if="showHeroCard && activeDashboardTab === 'Manage Business'"
          class="sticky top-0 z-30 shrink-0 flex items-center gap-1 sm:gap-6 overflow-x-auto rounded-b-lg border-x border-b border-t border-slate-200/80 bg-white shadow-xs px-4 sm:px-6 py-1 scrollbar-none mb-2"
          style="scrollbar-width: none; -ms-overflow-style: none;"
        >
          <button
            v-for="tab in heroTabs"
            :key="tab.id"
            type="button"
            @click="selectHeroTab(tab.id)"
            class="group flex shrink-0 items-center gap-2 border-b-2 py-2 px-2 text-xs font-semibold transition cursor-pointer"
            :class="
              activeHeroTab === tab.id
                ? 'border-violet-600 text-violet-600'
                : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
            "
          >
            <component
              :is="tab.icon"
              class="h-4 w-4 transition"
              :class="activeHeroTab === tab.id ? 'text-violet-600' : 'text-slate-400 group-hover:text-slate-600'"
            />
            <span>{{ tab.label }}</span>
          </button>
        </div>


      <div
        class="min-h-0 flex-1"
        :class="activeDashboardTab === 'Create Job' ? 'overflow-hidden' : 'flex flex-col'"
      >

<!-- =================================================
     DASHBOARD CONTENT
================================================= -->

<!-- Create Job -->
<div v-if="activeDashboardTab === 'Create Job'" class="h-full min-h-0 flex-1 flex flex-col mt-0">
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
<div v-else-if="activeDashboardTab === 'Manage Profile'" class="flex flex-col pb-0">
  <ManageProfile
    :initial-data="{
      name: company.name,
      tagline: company.description,
      industry: company.industry,
      location: company.location,
      website: company.website,
    }"
    @back="activeDashboardTab = 'Manage Jobs'"
    @saved="handleProfileSaved"
    @remove="handleProfileRemoved"
  />
</div>

<!-- Post Section (Announcements & Feed) -->
<div v-else-if="activeDashboardTab === 'Post'" class="mt-0 flex flex-col gap-4 pb-8">
  <!-- Feed Header -->
  <div class="flex items-center justify-between px-1">
    <h3 class="text-sm font-bold text-slate-800">
      Company Updates & Announcements ({{ companyPosts.length }})
    </h3>
  </div>

  <!-- Posts Feed -->
  <div v-if="companyPosts.length > 0" class="flex flex-col gap-3.5">
    <article
      v-for="post in companyPosts"
      :key="post.id"
      class="rounded-lg border border-slate-200 bg-white p-5 shadow-xs transition hover:border-slate-300"
    >
      <!-- Post Author Header -->
      <div class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white shadow-xs"
          >
            {{ post.initial }}
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-bold text-slate-900">{{ post.author }}</h4>
              <span class="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                {{ post.audience }}
              </span>
            </div>
            <p class="text-xs text-slate-400">{{ post.role }} • {{ post.time }}</p>
          </div>
        </div>

        <button
          type="button"
          @click="deletePost(post.id)"
          class="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 cursor-pointer"
          title="Delete post"
        >
          <Trash2 class="h-4 w-4" />
        </button>
      </div>

      <!-- Post Content Body -->
      <div class="mt-3.5 text-sm leading-relaxed text-slate-700 whitespace-pre-line">
        {{ post.content }}
      </div>

      <!-- Attached Media (Image / Document) -->
      <div v-if="post.attachment" class="mt-3.5 overflow-hidden rounded-lg border border-slate-100 bg-slate-50">
        <img
          v-if="post.attachment.url"
          :src="post.attachment.url"
          :alt="post.attachment.name"
          class="max-h-72 w-full object-cover"
        />
        <div v-else class="flex items-center gap-3 p-3 text-xs font-semibold text-slate-700">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
            📄
          </span>
          <span>{{ post.attachment.name }}</span>
        </div>
      </div>

      <!-- Post Footer Actions (Like, Comment, Share) -->
      <div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
        <div class="flex items-center gap-4">
          <button
            type="button"
            @click="togglePostLike(post)"
            class="inline-flex items-center gap-1.5 font-semibold transition hover:text-[#4F46E5] cursor-pointer"
            :class="post.isLiked ? 'text-[#4F46E5]' : 'text-slate-600'"
          >
            <ThumbsUp class="h-4 w-4" :class="{ 'fill-indigo-600': post.isLiked }" />
            <span>{{ post.likes }} Likes</span>
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-1.5 font-semibold text-slate-600 transition hover:text-slate-900 cursor-pointer"
          >
            <MessageSquare class="h-4 w-4" />
            <span>{{ post.comments }} Comments</span>
          </button>

          <button
            type="button"
            class="inline-flex items-center gap-1.5 font-semibold text-slate-600 transition hover:text-slate-900 cursor-pointer"
          >
            <Share2 class="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </article>
  </div>

  <!-- Empty State -->
  <div
    v-else
    class="rounded-lg border border-dashed border-slate-300 bg-white p-12 text-center shadow-xs"
  >
    <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
      <Send class="h-6 w-6 -rotate-12" />
    </div>
    <h4 class="mt-3 text-sm font-bold text-slate-800">No Posts Yet</h4>
    <p class="mt-1 text-xs text-slate-500">Create your first company announcement to engage with candidates.</p>
    <button
      type="button"
      @click="showPostModal = true"
      class="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 cursor-pointer"
    >
      <Plus class="h-3.5 w-3.5" />
      <span>Create a Post</span>
    </button>
  </div>
</div>

        <!-- =================================================
             JOB SEARCH / FILTER BAR & CONTENT (Unified Card)
        ================================================== -->

        <section
          v-if="activeDashboardTab === 'Manage Jobs'"
          class="mt-0 flex min-h-[435px] flex-col rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden"
        >

          <!-- SEARCH / FILTER BAR HEADER -->
          <div class="border-b border-slate-200 p-2">
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
                  class="h-7 w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                />

              </div>

              <!-- DATE -->

              <button
                type="button"
                class="flex h-7 items-center justify-between gap-5 rounded-lg border border-slate-200 px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
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
                  class="rounded-full px-2 py-1 text-xs font-medium transition cursor-pointer"
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
                class="flex h-7 shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-4 text-xs font-medium text-slate-700 transition hover:bg-slate-50 cursor-pointer"
              >
                <List class="h-4 w-4 text-violet-600" />
                Table View
              </button>

              <!-- CREATE JOB -->

              <button
                type="button"
                @click="createJob"
                class="flex h-7 shrink-0 items-center justify-center gap-2 rounded-lg bg-violet-600 px-2 text-xs font-bold text-white shadow-sm transition hover:bg-violet-700 cursor-pointer"
              >
                <Plus class="h-4 w-4" />
                Create Job Post
              </button>

            </div>
          </div>

          <!-- =================================================
               EMPTY STATE
          ================================================== -->

          <div
            v-if="filteredJobs.length === 0"
            class="flex flex-1 min-h-[380px] flex-col items-center justify-center px-5 text-center"
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

    <!-- CREATE POST MODAL POPUP -->
    <CreatePostModal
      v-if="showPostModal"
      v-model="showPostModal"
      user-initial="S"
      @close="showPostModal = false"
      @post="handleNewPost"
    />

    <!-- SUCCESS NOTIFICATION TOAST -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div
        v-if="showPostToast"
        class="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-lg border border-emerald-200 bg-white px-5 py-3.5 text-emerald-900 shadow-xl"
      >
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
          <CheckCircle2 class="h-5 w-5" />
        </div>
        <div>
          <p class="text-xs font-bold uppercase tracking-wider text-emerald-800">Post Published</p>
          <p class="text-xs font-medium text-slate-600">Your announcement has been posted successfully.</p>
        </div>
      </div>
    </transition>
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