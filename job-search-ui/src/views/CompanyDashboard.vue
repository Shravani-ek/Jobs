
<script setup lang="ts">
import { computed, ref, reactive, onMounted } from "vue";
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
  Pencil,
  MoreVertical,
} from "lucide-vue-next";

const route = useRoute();

const props = defineProps<{
  initialTab?: string;
}>();

/* =========================================================
   COMPANY DATA
========================================================= */

const company = reactive({
  name: "ADS",
  shortName: "AD",
  headline: "WE ARE A TECHNOLOGY-FOCUSED COMPANY COMMITTED TO DELIVERING INNOVATIVE DIGITAL SOLUTIONS...",
  description: "We are a technology-focused company committed to delivering innovative digital solutions that help businesses grow and improve their operations. We provide reliable software and cloud architectures.",
  location: "Pune, Maharashtra, India",
  website: "https://ads.tech",
  industry: "Software & IT Services",
  size: "11-50 employees",
  foundedYear: "2026",
  verified: true,
  companyCount: 2,
});

const featuredSlides = ref([
  {
    author: "nava",
    time: "7 days",
    title: "What is Software Testing?",
    snippet: "🧪 Software Testing ensures that applications are reliable, secure, and found before release improves the user experience...",
    tag: "SOFTWARE TESTING",
  },
  {
    author: "nava",
    time: "3 days",
    title: "Cloud Infrastructure & Scale",
    snippet: "⚡ Modern cloud architectures ensure 99.99% reliability, automated failover, and microsecond latency for global workloads...",
    tag: "CLOUD ARCHITECTURE",
  },
]);

const currentFeaturedSlide = ref(0);
const showPostCardMenu = ref(true);

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
          class="relative shrink-0 overflow-hidden rounded-lg border border-slate-200/80 bg-[#fbfcfe] shadow-xs"
          style="background-image: radial-gradient(#cbd5e1 1px, transparent 1px); background-size: 20px 20px;"
        >
          <!-- TOP MAIN CONTENT (Left: Info, Right: Featured Post Card) -->
          <div class="px-4 py-3 sm:px-6 sm:py-3.5">
            <div class="grid grid-cols-1 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,1fr)] gap-4 lg:gap-6 items-center">
              
              <!-- LEFT COLUMN: Brand, Name, Headline, Bio -->
              <div class="flex flex-col justify-center">
                <!-- Top row: Logo + Name & Verification -->
                <div class="flex items-center gap-3 sm:gap-4">
                  <!-- Logo Icon -->
                  <div
                    class="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-base sm:text-lg font-black text-white shadow-md shadow-blue-500/20 select-none"
                  >
                    {{ company.shortName || 'AD' }}
                  </div>

                  <!-- Name -->
                  <h1 class="text-2xl sm:text-2xl font-black tracking-tight text-slate-900 uppercase leading-none">
                    {{ company.name || 'ADS' }}
                  </h1>
                </div>

                <!-- Mission Headline -->
                <h2 class="mt-2 text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-tight leading-snug line-clamp-1">
                  {{ company.headline || 'WE ARE A TECHNOLOGY-FOCUSED COMPANY COMMITTED TO DELIVERING INNOVATIVE DIGITA...' }}
                </h2>

                <!-- Subtitle / Bio Paragraph -->
                <p class="mt-1 text-[11px] sm:text-xs text-slate-600 leading-relaxed max-w-2xl line-clamp-2">
                  {{ company.description || 'We are a technology-focused company committed to delivering innovative digital solutions that help businesses grow and improve their operations. We provide r...' }}
                </p>
              </div>

              <!-- RIGHT COLUMN: Dark Floating Post / Announcement Card -->
              <div class="relative w-full max-w-sm mx-auto lg:max-w-none">
                <div class="relative rounded-lg bg-[#0b1220] border border-slate-700/60 p-2.5 sm:p-3 text-white shadow-md overflow-hidden">
                  
                  <!-- Post Header Info & Dropdown Menu -->
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-center gap-2">
                      <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white shadow-xs">
                        N
                      </div>
                      <div class="flex items-center gap-1.5 text-xs leading-none">
                        <span class="font-bold text-slate-200 text-xs">{{ featuredSlides[currentFeaturedSlide]?.author || 'nava' }}</span>
                        <span class="text-[10px] text-slate-400">• {{ featuredSlides[currentFeaturedSlide]?.time || '7 days' }}</span>
                      </div>
                    </div>

                    <!-- Floating Action Menu (Edit / Delete) -->
                    <div class="relative">
                      <button
                        type="button"
                        @click="showPostCardMenu = !showPostCardMenu"
                        class="flex h-5 w-5 items-center justify-center rounded text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                        title="Post options"
                      >
                        <MoreVertical class="h-3.5 w-3.5" />
                      </button>

                      <!-- Menu Popover -->
                      <div
                        v-if="showPostCardMenu"
                        class="absolute right-0 top-6 z-20 w-28 rounded-lg border border-slate-700/80 bg-[#162032]/95 backdrop-blur-md p-1 shadow-xl text-xs"
                      >
                        <button
                          type="button"
                          @click="showPostModal = true; showPostCardMenu = false"
                          class="flex w-full items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium text-slate-200 hover:bg-slate-700/60 hover:text-white transition cursor-pointer"
                        >
                          <Pencil class="h-3 w-3 text-emerald-400" />
                          <span>Edit Post</span>
                        </button>
                        <button
                          type="button"
                          @click="showPostCardMenu = false"
                          class="flex w-full items-center gap-1.5 rounded px-2 py-1 text-[11px] font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition cursor-pointer"
                        >
                          <Trash2 class="h-3 w-3 text-rose-400" />
                          <span>Delete Post</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Post Snippet Content -->
                  <div class="mt-1.5">
                    <p class="text-[11px] font-semibold text-slate-200 leading-tight">
                      {{ featuredSlides[currentFeaturedSlide]?.title || 'What is Software Testing?' }}
                    </p>
                    <p class="mt-0.5 text-[10px] text-slate-400 line-clamp-1 leading-tight">
                      {{ featuredSlides[currentFeaturedSlide]?.snippet || '🧪 Software Testing ensures that applications are reliable, secure, and found before release improves the user experience...' }}
                    </p>
                  </div>

                  <!-- Visual Graphic Banner (Software Testing Network Blueprint) -->
                  <div class="mt-2 relative rounded-md overflow-hidden bg-[#070d19] border border-cyan-950/60 shadow-inner">
                    <svg
                      class="w-full h-20 sm:h-22 object-cover"
                      viewBox="0 0 400 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <!-- Deep cyber background glow -->
                      <defs>
                        <radialGradient id="cyberGlow" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.35" />
                          <stop offset="100%" stop-color="#070d19" stop-opacity="0" />
                        </radialGradient>
                        <linearGradient id="hexGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#38bdf8" />
                          <stop offset="100%" stop-color="#0284c7" />
                        </linearGradient>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stop-color="#0284c7" stop-opacity="0.2" />
                          <stop offset="50%" stop-color="#38bdf8" stop-opacity="0.8" />
                          <stop offset="100%" stop-color="#0284c7" stop-opacity="0.2" />
                        </linearGradient>
                      </defs>

                      <rect width="400" height="100" fill="#070d19" />
                      <circle cx="200" cy="50" r="55" fill="url(#cyberGlow)" />

                      <!-- Background city / server rack subtle silhouette -->
                      <g opacity="0.15" stroke="#38bdf8" stroke-width="0.5">
                        <line x1="20" y1="85" x2="380" y2="85" />
                        <line x1="50" y1="15" x2="50" y2="85" />
                        <line x1="120" y1="25" x2="120" y2="85" />
                        <line x1="280" y1="20" x2="280" y2="85" />
                        <line x1="350" y1="30" x2="350" y2="85" />
                      </g>

                      <!-- Connecting Circuit Traces -->
                      <g stroke="url(#lineGrad)" stroke-width="1.2">
                        <line x1="200" y1="28" x2="120" y2="24" />
                        <line x1="200" y1="72" x2="115" y2="76" />
                        <line x1="200" y1="28" x2="280" y2="24" />
                        <line x1="200" y1="72" x2="285" y2="76" />
                        <line x1="172" y1="50" x2="70" y2="50" />
                        <line x1="228" y1="50" x2="330" y2="50" />
                      </g>

                      <!-- Glow Dots on Lines -->
                      <circle cx="155" cy="26" r="2" fill="#38bdf8" />
                      <circle cx="245" cy="26" r="2" fill="#38bdf8" />
                      <circle cx="150" cy="74" r="2" fill="#38bdf8" />
                      <circle cx="250" cy="74" r="2" fill="#38bdf8" />

                      <!-- Outer Hex Node 1 (Top Left: Server) -->
                      <polygon points="120,16 130,22 130,34 120,40 110,34 110,22" stroke="#0284c7" stroke-width="1.2" fill="#0f172a" />
                      <path d="M115 26h10 M115 30h10" stroke="#38bdf8" stroke-width="1" stroke-linecap="round" />

                      <!-- Outer Hex Node 2 (Bottom Left: Security) -->
                      <polygon points="115,68 125,74 125,86 115,92 105,86 105,74" stroke="#0284c7" stroke-width="1.2" fill="#0f172a" />
                      <path d="M115 76v8 M111 78c0 4 4 6 4 6s4-2 4-6v-2l-4-1-4 1z" stroke="#38bdf8" stroke-width="1" fill="none" />

                      <!-- Outer Hex Node 3 (Top Right: Globe) -->
                      <polygon points="280,16 290,22 290,34 280,40 270,34 270,22" stroke="#0284c7" stroke-width="1.2" fill="#0f172a" />
                      <circle cx="280" cy="28" r="4.5" stroke="#38bdf8" stroke-width="1" fill="none" />

                      <!-- Outer Hex Node 4 (Bottom Right: Touch) -->
                      <polygon points="285,68 295,74 295,86 285,92 275,86 275,74" stroke="#0284c7" stroke-width="1.2" fill="#0f172a" />
                      <rect x="282" y="76" width="6" height="9" rx="1" stroke="#38bdf8" stroke-width="1" fill="none" />

                      <!-- Central Main Hexagon -->
                      <polygon
                        points="200,20 228,36 228,64 200,80 172,64 172,36"
                        stroke="url(#hexGrad)"
                        stroke-width="2"
                        fill="#0c182b"
                        filter="drop-shadow(0 0 6px rgba(56,189,248,0.5))"
                      />

                      <!-- Center Text inside Hexagon -->
                      <text x="200" y="47" text-anchor="middle" fill="#ffffff" font-size="8.5" font-family="system-ui, sans-serif" font-weight="900" letter-spacing="1">
                        SOFTWARE
                      </text>
                      <text x="200" y="58" text-anchor="middle" fill="#38bdf8" font-size="7.5" font-family="system-ui, sans-serif" font-weight="800" letter-spacing="1.2">
                        TESTING
                      </text>
                    </svg>
                  </div>

                  <!-- Carousel Indicators (bottom center) -->
                  <div class="mt-1.5 flex items-center justify-center gap-1.5">
                    <button
                      type="button"
                      @click="currentFeaturedSlide = 0"
                      class="h-1 rounded-full transition-all cursor-pointer"
                      :class="currentFeaturedSlide === 0 ? 'w-1 bg-slate-400' : 'w-4 bg-blue-500'"
                      title="Slide 1"
                    ></button>
                    <button
                      type="button"
                      @click="currentFeaturedSlide = 1"
                      class="h-1 rounded-full transition-all cursor-pointer"
                      :class="currentFeaturedSlide === 1 ? 'w-1 bg-slate-400' : 'w-4 bg-blue-500'"
                      title="Slide 2"
                    ></button>
                  </div>

                </div>
              </div>

            </div>
          </div>

          <!-- BOTTOM META ROW -->
          <div class="border-t border-slate-200/70 bg-white/70 px-4 sm:px-6 py-2 sm:py-2.5">
            <div class="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs font-semibold text-slate-700">
              <!-- Industry -->
              <span class="flex items-center gap-1.5">
                <Building2 class="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>{{ company.industry || 'Software & IT Services' }}</span>
              </span>

              <!-- Location -->
              <span class="flex items-center gap-1.5">
                <MapPin class="h-3.5 w-3.5 text-rose-500 shrink-0" />
                <span>{{ company.location || 'Pune, Maharashtra, India' }}</span>
              </span>

              <!-- Employees -->
              <span class="flex items-center gap-1.5">
                <Users class="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{{ company.size || '11-50 employees' }}</span>
              </span>

              <!-- Est. Year -->
              <span class="flex items-center gap-1.5">
                <CalendarDays class="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <span>Est. {{ company.foundedYear || '2026' }}</span>
              </span>
            </div>
          </div>

          <!-- =================================================
               DASHBOARD TABS (Joined directly into Hero Card)
          ================================================= -->
          <div class="border-t border-slate-200 bg-white px-3 sm:px-5 py-1">
            <div class="flex flex-wrap items-center justify-between gap-3">

              <div class="flex flex-wrap items-center gap-2">
                <button
                  v-for="tab in dashboardTabs"
                  :key="tab.id"
                  type="button"
                  @click="selectDashboardTab(tab)"
                  class="flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition cursor-pointer"
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
                class="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-700 transition hover:border-violet-300 hover:bg-violet-50 hover:text-violet-600 cursor-pointer"
              >
                <Building2 class="h-3.5 w-3.5" />
                <span>Switch / Accounts (1)</span>
              </button>

            </div>
          </div>
        </section>

      <div
        class="min-h-0 flex-1"
        :class="['Manage Profile', 'Create Job'].includes(activeDashboardTab) ? 'overflow-hidden flex flex-col' : 'overflow-y-auto pr-1 scrollbar-hide'"
      >

<!-- =================================================
     DASHBOARD CONTENT
================================================= -->

<!-- Create Job -->
<div v-if="activeDashboardTab === 'Create Job'" class="h-full min-h-0 flex-1 flex flex-col mt-2">
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
<div v-else-if="activeDashboardTab === 'Manage Profile'" class="h-full min-h-0 flex-1 flex flex-col mt-2">
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
<div v-else-if="activeDashboardTab === 'Post'" class="mt-3 flex flex-col gap-4 pb-8">
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
          class="mt-3 flex min-h-[435px] flex-col rounded-lg border border-slate-200 bg-white shadow-xs overflow-hidden"
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